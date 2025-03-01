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

const rooms = {};

io.on('connection', (socket) => {
    socket.on('code-update', ({ roomId, code }) => {
        socket.broadcast.to(roomId).emit('code-update', code);
    });

    socket.on('attempt-join', ({ username, roomId }) => {
        // TODO - verify username for duplicates

        const user = { username, roomId };

        if(rooms[roomId]) {
            rooms[roomId]['users'].push({ username, roomId });
        } else {
            rooms[roomId] = { users: [user] }
        }

        socket.join(roomId);
        io.to(socket.id).emit('joined-room', { username, roomId });

        console.log(username + ' has connected to room: ' + roomId);
        console.log(rooms);
    });
    
});

server.listen(5000, () => {
    console.log('Backend started at http://localhost:5000');
});