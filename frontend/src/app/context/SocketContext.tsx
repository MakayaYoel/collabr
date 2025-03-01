'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { useUserContext } from './UserContext';
import { useEditorContext } from './EditorContext';
import { SocketEvent } from '@/lib/socketEvents';

type SocketContextType = {
    currentSocket: Socket | null;
    
    setCurrentSocket: (currentSocket: Socket) => void;
};

const SocketContext = createContext<SocketContextType | null>(null);

export function useSocketContext() : SocketContextType {
    const context = useContext(SocketContext);

    if(context === null) throw new Error('useSocketContext must be used within a SocketContextProvider.');

    return context;
}

export function SocketContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [currentSocket, setCurrentSocket] = useState<Socket | null>(null);
    const { currentUser } = useUserContext();
    const { setCode } = useEditorContext();

    const handleCodeUpdate = (code: string) => setCode(code);

    // Create new socket when user has joined a room.
    useEffect(() => {
        if(!currentUser.username || !currentUser.roomId) {
            return; // TODO - add some kind of status variable to know when the user has joined a room.
        }

        const socket = io(process.env.BACKEND_SERVER_URL);

        socket.on(SocketEvent.CODE_UPDATE, handleCodeUpdate);

        setCurrentSocket(socket);

        // Disconnect on destruct
        return () => {
            socket.disconnect();
            setCurrentSocket(null);
        }
    }, [currentUser]);

    return (
        <SocketContext.Provider value={{ currentSocket, setCurrentSocket }}>
            {children}
        </SocketContext.Provider>
    );
};