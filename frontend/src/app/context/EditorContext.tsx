'use client';

import { createContext, useContext, useState } from "react";
import { User } from "../types/types";

type EditorContextType = {
    code: string | undefined;
    codeOutput: string;
    remoteUsers: User[];
    language: string;

    setCode: (code: string | undefined) => void;
    setCodeOutput: (codeOutput: string) => void;
    setRemoteUsers: (remoteUsers: User[]) => void;
    setLanguage: (language: string) => void;
};

const EditorContext = createContext<EditorContextType | null>(null);

export function useEditorContext() : EditorContextType {
    const context = useContext(EditorContext);

    if(context === null) throw new Error('useEditorContext must be used within an EditorContextProvider.');

    return context;
};

export function EditorContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [codeOutput, setCodeOutput] = useState<string>('');
    const [code, setCode] = useState<string | undefined>('');
    const [remoteUsers, setRemoteUsers] = useState<User[]>([]);
    const [language, setLanguage] = useState<string>('javascript');

    return (
        <EditorContext.Provider value={{ code, codeOutput, remoteUsers, language, setCode, setCodeOutput, setRemoteUsers, setLanguage }}>
            {children}
        </EditorContext.Provider>
    )
}