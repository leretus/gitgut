const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Port: ${PORT}`));

const connections = [null, null];

io.on('connection', (socket) => {
    let playerIndex = -1;

    for (const i in connections) {
        if (connections[i] === null) {
            playerIndex = i;
            connections[i] = socket;
            break;
        }
    }

    socket.emit('player-number', playerIndex);

    if (playerIndex === -1) {
        return;
    }

    socket.broadcast.emit('playercon', playerIndex);
    console.log(`Połączono gracza ${playerIndex}`);

    socket.on('disconnect', () => {
        console.log(`Rozłączono gracza ${playerIndex}`);
        connections[playerIndex] = null;
        socket.broadcast.emit('playercon', playerIndex);
    });

    socket.on('player-ready', () => {
        socket.broadcast.emit('enemy-ready', playerIndex);
        connections[playerIndex] = true;
    });

    socket.on('check-players', () => {
        const players = connections.map(connection => 
            connection === null 
                ? { connected: false, ready: false } 
                : { connected: true, ready: connection === true }
        );
        socket.emit('check-players', players);
    });
});
