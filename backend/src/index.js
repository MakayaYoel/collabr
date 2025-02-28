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
    socket.on('code-change', (code) => {
        io.emit('code-change', code);
        console.log('code change: ' + code);
    })
    console.log('a socket has connected');
});

server.listen(5000, () => {
    console.log('Backend started at http://localhost:5000');
});