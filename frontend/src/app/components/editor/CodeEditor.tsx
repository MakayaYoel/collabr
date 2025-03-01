'use client';

import { useEditorContext } from "@/app/context/EditorContext";
import { useSocketContext } from "@/app/context/SocketContext";
import { useUserContext } from "@/app/context/UserContext";
import { useSessionStorage } from "@/app/hooks/useSessionStorage";
import { SocketEvent } from "@/lib/socketEvents";
import { UserStatus } from "@/lib/userStatuses";
import { Editor } from "@monaco-editor/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function CodeEditor() {
    const { code, setCode } = useEditorContext();
    const { socket } = useSocketContext();
    const { currentUser, setCurrentUser, currentStatus } = useUserContext();
    const router = useRouter();

    const handleCodeChange = (value: string | undefined) => {
        socket.emit(SocketEvent.CODE_UPDATE, { roomId: currentUser.roomId, code: value });
        setCode(value);
    };

    useEffect(() => {
        if(currentUser.username && currentUser.roomId) return;

        const { getItem } = useSessionStorage();
        const sessionCurrentUser = getItem('currentUser');

        if(!sessionCurrentUser || !JSON.parse(sessionCurrentUser).username) {
            router.push('/');
        } else if(JSON.parse(sessionCurrentUser).username && JSON.parse(sessionCurrentUser).roomId) {
            setCurrentUser(JSON.parse(sessionCurrentUser));
            socket.emit(SocketEvent.ATTEMPT_JOIN, JSON.parse(sessionCurrentUser));
        }
    }, [currentUser]);

    useEffect(() => {
        if(currentStatus == UserStatus.DISCONNECTING) {
            router.push('/');
        }
    }, [currentStatus]);

    return (
        <Editor
                defaultLanguage="javascript"
                theme="vs-dark"
                options={{
                    minimap: { enabled: false},
                    fontSize: 16,
                    theme: 'vs-dark',
                    language: 'javascript',
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                    renderWhitespace: "selection",
                    fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                    fontLigatures: true,
                    cursorBlinking: "smooth",
                    smoothScrolling: true,
                    contextmenu: true,
                    renderLineHighlight: "all",
                    lineHeight: 1.6,
                    letterSpacing: 0.5,
                    roundedSelection: true,
                }}
                value={code}
                onChange={handleCodeChange}
            />
    );
}

export default CodeEditor;