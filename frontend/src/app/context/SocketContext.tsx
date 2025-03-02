'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import { Socket, io } from 'socket.io-client';
import { useEditorContext } from './EditorContext';
import { SocketEvent } from '@/lib/socketEvents';
import { useUserContext } from './UserContext';
import { UserStatus } from '@/lib/userStatuses';
import { toast } from 'react-toastify';

type SocketContextType = {
    socket: Socket;
};

const SocketContext = createContext<SocketContextType | null>(null);

export function useSocketContext() : SocketContextType {
    const context = useContext(SocketContext);

    if(context === null) throw new Error('useSocketContext must be used within a SocketContextProvider.');

    return context;
}

export function SocketContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { setCode, setCodeOutput } = useEditorContext();
    const { setCurrentUser, setCurrentStatus } = useUserContext();

    // Only create the socket on mounting
    const socket = useMemo<Socket>(() => io(process.env.BACKEND_SERVER_URL), []);

    // Events
    useEffect(() => {
        socket.on(SocketEvent.CODE_UPDATE, (code: string) => setCode(code));

        socket.on(SocketEvent.JOINED_ROOM, ({ username, roomId }: { username: string, roomId: string }) => {
            setCurrentUser({ username, roomId });
            setCurrentStatus(UserStatus.JOINED_ROOM);
        });

        socket.on(SocketEvent.LEAVE_ROOM, () => {
            setCurrentStatus(UserStatus.DISCONNECTING);
            setCode('');
            setCodeOutput('');
        });

        socket.on(SocketEvent.USER_JOINED, ({ username }: { username: string }) => {
            toast.success(`${username} has joined the room.`);
        });

        socket.on(SocketEvent.USER_LEFT, ({ username }: { username: string } ) => {
            toast.error(`${username} has left the room.`);
        });

        return () => {
            socket.off(SocketEvent.CODE_UPDATE);
            socket.off(SocketEvent.JOINED_ROOM);
            socket.off(SocketEvent.LEAVE_ROOM);
            socket.off(SocketEvent.USER_JOINED);
        }
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};