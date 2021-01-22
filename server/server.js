import express from "express";
import http from "http";
import socketio from "socket.io";

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

const game = {
    players : {}
}

app.get('/', (req, res) => res.send ('Hello World!'));

sockets.on('connection', (socket) => {
    console.log(`${socket.id} connected!`)

    const name = 'Player_' + socket.id.substr(0, 5);
    game.players[socket.id] = { name };

    sendMessage(game.players[socket.id], 'connected!');
    refreshPlayers();

    socket.on('disconnect', () => {
        sendMessage(game.players[socket.id], 'disconnected.');
        delete game.players[socket.id];
        refreshPlayers();
    });

    socket.on('SendMessage', (message) => {        

        sendMessage(game.players[socket.id], message);
    });
});

const sendMessage = (player, message) => {
    sockets.emit('ReceiveMessage', `${player.name}: ${message}`);
    console.log(`${player}: ${message}`);

}

const refreshPlayers = () => {
    sockets.emit('PlayerRefresh', game.players);
}


const port = 4000;
server.listen(port, () => console.log(`Example app listening on port ${port}!`));