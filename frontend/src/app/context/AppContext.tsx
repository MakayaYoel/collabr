'use client';

import { createContext, useState, useEffect, useContext } from "react";

interface AppContextType {
    roomId: string;
    username: string;
    setRoomId: (roomId: string) => void;
    setUsername: (username: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () : AppContextType => {
    const context = useContext(AppContext);

    if(context === null) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }

    return context;
}

export const AppContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [roomId, setStateRoomId] = useState<string>('');
    const [username, setStateUsername] = useState<string>('');

    // Attempt to load data from local storage
    useEffect(() => {
        if(typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
            const storageRoomId = localStorage.getItem('roomId');
            const storageUsername = localStorage.getItem('username');

            if(storageRoomId) setStateRoomId(storageRoomId);
            if(storageUsername) setStateUsername(storageUsername);
        }
    }, []);

    const setUsername = (username: string) => {
        if(typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
            setStateUsername(username);
            localStorage.setItem('username', username);
        }
    };

    const setRoomId = (roomId: string) => {
        if(typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
            setStateRoomId(roomId);
            localStorage.setItem('roomId', roomId);
        }
    }

    return (
        <AppContext.Provider value={{ roomId, username, setRoomId, setUsername }}>
            {children}
        </AppContext.Provider>
    );
};