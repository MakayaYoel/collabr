'use client';

import { createContext, useState, useEffect, useContext } from "react";
import { io, Socket } from 'socket.io-client';

type AppContextType = {
    currentUser: User;
    setCurrentUser: (newCurrentUser: User) => void;
}

interface User {
    username: string;
    roomId: string;
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
    const [currentUser, setStateCurrentUser] = useState<User>({
        username,
        roomId,
    });


    // Attempt to load data from local storage
    useEffect(() => {
        if(typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
            const storageRoomId = localStorage.getItem('roomId');
            const storageUsername = localStorage.getItem('username');

            if(storageRoomId && storageUsername) {
                setStateUsername(storageUsername);
                setStateRoomId(storageRoomId);

                setStateCurrentUser({ username: storageUsername, roomId: storageRoomId });
            }   
        }
        
    }, []);

    const setCurrentUser = ({ username, roomId }: User) => {
        if(typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
            setStateUsername(username);
            localStorage.setItem('username', username);

            setStateRoomId(roomId);
            localStorage.setItem('roomId', roomId);

            setStateCurrentUser({ username, roomId })
        }
    };

    return (
        <AppContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AppContext.Provider>
    );
};