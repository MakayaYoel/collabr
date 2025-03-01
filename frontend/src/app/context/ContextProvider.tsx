import { ReactNode } from "react";
import { UserContextProvider } from "./UserContext";
import { EditorContextProvider } from "./EditorContext";
import { SocketContextProvider } from "./SocketContext";

export default function ContextProvider({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <UserContextProvider>
            <EditorContextProvider>
                <SocketContextProvider>
                    {children}
                </SocketContextProvider>
            </EditorContextProvider>
        </UserContextProvider>
    );
}