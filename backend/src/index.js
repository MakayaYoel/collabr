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

const rooms = new Map();

function getUserRoom(clientSocketId) {
    let userRoomId = "";

    rooms.forEach((room) => {
        room.users.forEach(({ roomId, socketId }) => {
            if(clientSocketId == socketId) {
                userRoomId = roomId;
            }
        });
    });

    return userRoomId || null;
}

function getRoomParticipants(roomId) {
    if(!rooms.has(roomId)) return [];
    const room = rooms.get(roomId);

    const roomParticipants = [];

    room.users.forEach((user) => {
        roomParticipants.push({ username: user.username, roomId: user.roomId });
    });

    return roomParticipants;
}

io.on('connection', (socket) => {
    socket.on('code-update', ({ roomId, code }) => {
        rooms.get(roomId).code = code;
        socket.broadcast.to(roomId).emit('code-update', code);
    });

    socket.on('attempt-join', ({ username, roomId }) => {
        const user = { username, roomId, socketId: socket.id };

        if(!rooms.has(roomId)) {
            rooms.set(roomId, { users: new Map(), code: '' });
        }

        const room = rooms.get(roomId);
        room.users.set(socket.id, user);

        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-joined', { username });

        const remoteUsers = [];
        room.users.forEach((user) => {
            if(user.username !== username) remoteUsers.push({ username: user.username, roomId: user.roomId });
        });
        
        io.to(socket.id).emit('joined-room', { username, roomId, remoteUsers });
        io.to(socket.id).emit('code-update', room.code);
        io.to(roomId).emit('change-users', getRoomParticipants(roomId));
    });

    socket.on('change-language', ({ language }) => {
        const userRoom = getUserRoom(socket.id);
        if(!userRoom) return;

        io.to(userRoom).emit('change-language', { language });
    });

    // disconnecting from clicking home button
    socket.on('leave-room', () => {
        const userRoom = getUserRoom(socket.id);
        if(!userRoom) return;

        const room = rooms.get(userRoom);
        const username = room.users.get(socket.id).username;
        room.users.delete(socket.id);
        socket.leave(userRoom);

        if(room.users.size == 0) rooms.delete(userRoom);

        io.to(socket.id).emit('leave-room');
        io.to(userRoom).emit('user-left', { username });
        io.to(userRoom).emit('change-users', getRoomParticipants(userRoom));
    });

    // disconnecting from reloading
    socket.on('disconnect', () => {
        const userRoom = getUserRoom(socket.id);
        if(!userRoom) return;

        const room = rooms.get(userRoom);
        const username = room.users.get(socket.id).username;
        room.users.delete(socket.id);
        socket.leave(userRoom);

        if(room.users.size == 0) rooms.delete(userRoom);

        io.to(socket.id).emit('leave-room');
        io.to(userRoom).emit('user-left', { username });
        io.to(userRoom).emit('change-users', getRoomParticipants(userRoom));
    });
});

server.listen(5000, () => {
    console.log(`Backend Server Started: http://localhost:5000`);
});