'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { useEditorContext } from './EditorContext';
import { SocketEvent } from '@/lib/socketEvents';

type SocketContextType = {
    socket: Socket | null;
};

const SocketContext = createContext<SocketContextType | null>(null);

export function useSocketContext() : SocketContextType {
    const context = useContext(SocketContext);

    if(context === null) throw new Error('useSocketContext must be used within a SocketContextProvider.');

    return context;
}

export function SocketContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { setCode } = useEditorContext();

    // Only create the socket once for an entire session
    const socket = useMemo(() => io(process.env.BACKEND_SERVER_URL), []);

    // Events
    socket.on(SocketEvent.CODE_UPDATE, (code: string) => setCode(code));
    
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};