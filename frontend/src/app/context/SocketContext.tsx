'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { useEditorContext } from './EditorContext';
import { SocketEvent } from '@/lib/socketEvents';
import { useUserContext } from './UserContext';
import { UserStatus } from '@/lib/userStatuses';

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
    const { setCode } = useEditorContext();
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
        });

        return () => {
            socket.off(SocketEvent.CODE_UPDATE);
            socket.off(SocketEvent.JOINED_ROOM);
            socket.off(SocketEvent.LEAVE_ROOM);
        }
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};