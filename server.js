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
    for (let i = 0; i < connections.length; i++) {
        if (connections[i] === null) {
            playerIndex = i;
            connections[i] = socket; 
            break;
        }
    }

    if (playerIndex === -1) {
        return;
    }

    socket.emit('player-number', playerIndex);
    console.log(`Połączono gracza ${playerIndex}`);

    socket.on('disconnect', () => {
        console.log(`Rozłączono gracza ${playerIndex}`);
        connections[playerIndex] = null; 
    });
});
