'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { UserStatus } from "@/lib/userStatuses";
import { User } from "../types/types";

type UserContextType = {
    currentUser: User;
    currentStatus: UserStatus;

    setCurrentUser: (currentUser: User) => void;
    setCurrentStatus: (currentStatus: UserStatus) => void;
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
    const [currentStatus, setCurrentStatus] = useState<UserStatus>(UserStatus.IDLE);

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
        <UserContext.Provider value={{ currentUser, currentStatus, setCurrentUser, setCurrentStatus }}>
            {children}
        </UserContext.Provider>
    );
}