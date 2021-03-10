import express from "express";
import http from "http";
import socketio from "socket.io";

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

const gameConfig = {
    width: 580,
    height: 320
}

const game = {
    players : {},
    rooms: {},
    match: {}
}


sockets.on('connection', (socket) => {
    console.log(`${socket.id} connected!`)

    const name = 'Player_' + socket.id.substr(0, 5);
    game.players[socket.id] = { name };

    sendMessage(game.players[socket.id], 'connected!');
    refreshPlayers();
    refreshRooms();


    socket.on('disconnect', () => {
        sendMessage(game.players[socket.id], 'disconnected.')
        leaveRoom(socket);

        delete game.players[socket.id];
        refreshPlayers();
        refreshRooms();
    });

    socket.on('SendMessage', (message) => {        

        sendMessage(game.players[socket.id], message);
    });
    socket.on('CreateRoom', () => {
        socket.join(socket.id);

        game.rooms[socket.id] = { 
            name: `${game.players[socket.id].name}'s Room.`,
            player1: socket.id,
            player2: undefined
        }
        game.players[socket.id].room = socket.id;
        console.log(game.players[socket.id]);

        refreshPlayers();
        refreshRooms();
        sendMessage(game.players[socket.id], 'created a new room.');
    });

    socket.on('QuitRoom', () => {
        leaveRoom(socket);

        refreshRooms();
        refreshPlayers();
    })

    socket.on('StartGame', () => {
        startGame(socket);

        refreshRooms();
        refreshPlayers();
    })

    socket.on('JoinRoom', (roomId) => {
        socket.join(roomId);

        const position = game.rooms[roomId].player1 ? '2' : '1'

        game.rooms[roomId][`player${position}`] = socket.id ;

        game.players[socket.id].room = roomId;

        const room = game.rooms[roomId];
        if (room.player1 && room.player2){
            game.match[roomId] = { 
                gameConfig,
                player1: { ready: false },
                player2: { ready: false },
                score1: 0,
                score2: 0,
                status: 'READY'
            }

        }

        refreshPlayers();
        refreshRooms();
        refreshMatch(roomId);
        sendMessage(game.players[socket.id], 'joined the room.');
    });

    socket.on('GameLoaded', () => {
        const roomId = game.players[socket.id].room;
        const match = game.match[roomId];
        const player = 'player' + (game.rooms[roomId].player1 == socket.id ? 1 : 2);

        match[player] = { ready: true };

        if (match.player1.ready && match.player2.ready) {
            match.status = 'PLAY'
            match.ball = {
                width: 5,
                xdirection: 1,
                ydirection: 1,
                xspeed: 2.8,
                yspeed: 2.2,
                x: gameConfig.width / 2,
                y: gameConfig.height / 2
            };
        }
    });

});

const leaveRoom = (socket) => {
    const socketId = socket.id;
    const roomId = game.players[socketId].room;
    const room = game.rooms[roomId];
     
    if(room){
        const match = game.match[roomId];

        game.players[socketId].room = undefined;
        
        const playerNumber = 'player' + (socketId === room.player1 ? 1 : 2)

        room[playerNumber] = undefined;

        if(match.status == 'START' || match.status == 'PLAY'){
            match[playerNumber] = undefined;
            match.status = 'END';
            match.message = `Player ${game.players[socketId].name} has disconnected.`;
        }

        if(!room.player1 && !room.player2){
            delete game.rooms[roomId];
            if (match){
                delete game.match[roomId]
            }
        }


        socket.leave(roomId);

    }
}

const startGame = (socket) => {
    const socketId = socket.id;
    const roomId = game.players[socketId].room;

    const room = game.rooms[roomId];
    if (room.player1 && room.player2) {
        game.match[roomId] = {
            gameConfig,
            player1: { ready: false },
            player2: { ready: false },
            score1: 0,
            score2: 0, 
            status: 'START'
        
        }
        gameInProgress(roomId);
    }

    refreshMatch(roomId);
}

const gameInProgress = (roomId) => {
    const match = game.match[roomId];
    if(!match || match === 'END')
        return;

    const { ball } = match;

    switch(match.status) {
        case 'PLAY':
            const xpos = ball.x + ball.xspeed * ball.xdirection;
            const ypos = ball.y + ball.yspeed * ball.ydirection;

            ball.x = xpos;
            ball.y = ypos;

            if(xpos > match.gameConfig.width - ball.width || xpos < ball.width){
                ball.xdirection *= -1;
            }
            if(ypos > match.gameConfig.height - ball.width || ypos < ball.width){
                ball.ydirection *= -1;
            }
            if(xpos < ball.width){
                match.score2++;
            }
            if(xpos > match.gameConfig.width - ball.width){
                match.score1++
            }
            break;
                
    }

    refreshMatch(roomId)

    setTimeout(() => gameInProgress(roomId), 1000 / 60);
}

const sendMessage = (player, message) => {
    sockets.emit('ReceiveMessage', `${player.name}: ${message}`);
}

const refreshPlayers = () => {
    sockets.emit('PlayerRefresh', game.players);
}

const refreshRooms = () => {
    sockets.emit('RoomsRefresh', game.rooms);
}

const refreshMatch = (roomId) => {
    sockets.to(roomId).emit('MatchRefresh', game.match[roomId] || {});
}

app.get('/', (req, res) => res.send ('Hello World!'));


const port = 4000;
server.listen(port, () => console.log(`Example app listening on port ${port}!`));