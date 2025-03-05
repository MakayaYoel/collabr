'use client';

import { useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { useEditorContext } from "@/app/context/EditorContext";
import { useSocketContext } from "@/app/context/SocketContext";
import { useUserContext } from "@/app/context/UserContext";
import { useSessionStorage } from "@/app/hooks/useSessionStorage";
import { SocketEvent } from "@/lib/socketEvents";
import { UserStatus } from "@/lib/userStatuses";
import { useRouter } from "next/navigation";

function CodeEditor({ paramsRoomId }: { paramsRoomId: string }) {
    const { code, setCode, language } = useEditorContext(); // Language state
    const { socket } = useSocketContext();
    const { currentUser, currentStatus } = useUserContext();
    const router = useRouter();

    const handleCodeChange = (value: string | undefined) => {
        socket.emit(SocketEvent.CODE_UPDATE, { roomId: currentUser.roomId, code: value });
        setCode(value);
    };

    useEffect(() => {
        // Handle user session and redirects
        if (currentUser.username && currentUser.roomId) return;

        const { getItem } = useSessionStorage();
        const sessionCurrentUser = getItem('currentUser');

        if (!sessionCurrentUser || !JSON.parse(sessionCurrentUser).username) {
            router.push('/');
        } else if (JSON.parse(sessionCurrentUser).roomId !== paramsRoomId) {
            router.push('/');
            socket.emit(SocketEvent.LEAVE_ROOM);
        } else if (JSON.parse(sessionCurrentUser).username && JSON.parse(sessionCurrentUser).roomId) {
            socket.emit(SocketEvent.ATTEMPT_JOIN, JSON.parse(sessionCurrentUser));
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentStatus == UserStatus.DISCONNECTING) {
            router.push('/');
        }
    }, [currentStatus]);

    return (
        <Editor
            theme="vs-dark"
            language={language}
            options={{
                minimap: { enabled: false },
                fontSize: 16,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
            }}
            value={code}
            onChange={(value) => handleCodeChange(value)}
        />
    );
}

export default CodeEditor;
