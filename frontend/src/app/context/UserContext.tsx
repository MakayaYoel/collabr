'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

interface User {
    username: string;
    roomId: string;
};

type UserContextType = {
    currentUser: User;

    setCurrentUser: (currentUser: User) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() : UserContextType {
    const context = useContext(UserContext);

    if(context === null) throw new Error('useUserContext has to be used within a UserContextProvider.');

    return context;
}

export function UserContextProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [currentUser, setStateCurrentUser] = useState<User>({
        username: '',
        roomId: ''
    });

    // Load data from session storage - useRouter() doesn't support browser history state :(
    useEffect(() => {
        const { getItem } = useSessionStorage();

        const sessionCurrentUser = getItem('currentUser');

        if(sessionCurrentUser) {
            setStateCurrentUser(JSON.parse(sessionCurrentUser));
        }
    }, []);

    // Custom setters (updates state and session storage)
    const setCurrentUser = (user: User) => {
        const { setItem } = useSessionStorage();

        setItem('currentUser', JSON.stringify(user));
        setStateCurrentUser(user);
    };

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}