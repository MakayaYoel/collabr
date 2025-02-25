'use client';

import { createContext, useContext, useState } from "react";

type EditorContextType = {
    code: string | undefined;
    setCode: (code: string | undefined) => void;
    codeOutput: string;
    setCodeOutput: (codeOutput: string) => void;
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
    const [code, setCode] = useState<string | undefined>('');

    return (
        <EditorContext.Provider value={{ codeOutput, setCodeOutput, code, setCode }}>
            {children}
        </EditorContext.Provider>
    )
}