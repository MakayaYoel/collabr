'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { useAppContext } from "./AppContext";
import { Socket, io } from "socket.io-client";

type EditorContextType = {
    code: string | undefined;
    setCode: (code: string | undefined) => void;
    codeOutput: string;
    setCodeOutput: (codeOutput: string) => void;
    socket: Socket | null;
};

const EditorContext = createContext<EditorContextType | null>(null);

export const useEditorContext = () : EditorContextType => {
    const context = useContext(EditorContext);

    if(context === null) {
        throw new Error('useEditorContext must be used within an EditorContextProvider');
    }

    return context;
};

export const EditorContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [codeOutput, setCodeOutput] = useState<string>('');
    const [code, setStateCode] = useState<string | undefined>('');
    const [socket, setCurrentSocket] = useState<Socket | null>(null);

    const { currentUser } = useAppContext();
    const { roomId, username } = currentUser;

    useEffect(() => {
        if(!roomId || !username) return;
    
            const newSocket = io('http://localhost:5000');

            newSocket.on('code-change', (code) => {
                setStateCode(code);
                console.log("CHANING CODE");
            })
    
            setCurrentSocket(newSocket);
    }, [roomId, username]);

    const setCode = (code: string | undefined) => {
        if(socket === null) {
            console.log('nulllll')
            return;
        }

        socket.emit('code-change', code);

        setStateCode(code);
    };

    return (
        <EditorContext.Provider value={{ codeOutput, setCodeOutput, code, setCode, socket }}>
            {children}
        </EditorContext.Provider>
    )
}