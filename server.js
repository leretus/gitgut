const express = require('express');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 3000
const socketio = require('socket.io');
const app = express()
const server = http.createServer(app)
const io = socketio(server)



app.use(express.static(path.join(__dirname,'public')))

server.listen(PORT, () => console.log(`Serwer start na porcie ${PORT}`))