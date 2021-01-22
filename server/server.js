import express from "express";
import http from "http";
import socketio from "socket.io";

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

const game = {
    players : {},
    rooms: {}
}

app.get('/', (req, res) => res.send ('Hello World!'));

sockets.on('connection', (socket) => {
    console.log(`${socket.id} connected!`)

    const name = 'Player_' + socket.id.substr(0, 5);
    game.players[socket.id] = { name };

    sendMessage(game.players[socket.id], 'connected!');
    refreshPlayers();
    refreshRooms();


    socket.on('disconnect', () => {
        sendMessage(game.players[socket.id], 'disconnected.')
        leaveRoom(socket.id);

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
            name: `${game.players[socket.id].name}'s room.`,
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
        leaveRoom(socket.id);

        refreshRooms();
        refreshPlayers();
    })

    socket.on('JoinRoom', (roomId) => {
        socket.join(roomId);

        const position = game.rooms[roomId].player1 ? '2' : '1'

        game.rooms[roomId][`player${position}`] = socket.id ;

        game.players[socket.id].room = roomId;

        refreshPlayers();
        refreshRooms();
        sendMessage(game.players[socket.id], 'joined the room.');
    });
});

const leaveRoom = (socketId) => {

    console.log(game.rooms);
    const roomId = game.players[socketId].room;
    const room = game.rooms[roomId];
     
    if(room){
        game.players[socketId].room = undefined;

        if(socketId === room.player1){
            room.player1 = undefined;
        }else{
            room.player2 = undefined;
        }

        if(!room.player1 && !room.player2){
            delete game.rooms[socketId];
        }
    }
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

const port = 4000;
server.listen(port, () => console.log(`Example app listening on port ${port}!`));