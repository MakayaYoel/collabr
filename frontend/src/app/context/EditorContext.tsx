'use client';

import { createContext, useContext, useState } from "react";

type EditorContextType = {
    code: string | undefined;
    codeOutput: string;

    setCode: (code: string | undefined) => void;
    setCodeOutput: (codeOutput: string) => void;
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

    return (
        <EditorContext.Provider value={{ code, codeOutput, setCode, setCodeOutput }}>
            {children}
        </EditorContext.Provider>
    )
}