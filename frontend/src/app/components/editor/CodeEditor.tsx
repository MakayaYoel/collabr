'use client';

import { useEditorContext } from "@/app/context/EditorContext";
import { useSocketContext } from "@/app/context/SocketContext";
import { useUserContext } from "@/app/context/UserContext";
import { SocketEvent } from "@/lib/socketEvents";
import { Editor } from "@monaco-editor/react";

function CodeEditor() {
    const { code, setCode } = useEditorContext();
    const { socket } = useSocketContext();
    const { currentUser } = useUserContext();

    const handleCodeChange = (value: string | undefined) => {
        socket.emit(SocketEvent.CODE_UPDATE, { roomId: currentUser.roomId, code: value });
        setCode(value);
    };

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