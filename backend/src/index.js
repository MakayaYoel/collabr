import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    socket.on('code-update', (code) => {
        io.emit('code-update', code);
        console.log('code update: ' + code);
    })
    console.log('a socket has connected');
});

server.listen(5000, () => {
    console.log('Backend started at http://localhost:5000');
});