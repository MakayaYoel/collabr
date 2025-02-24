'use client';

import { Editor } from "@monaco-editor/react";

function CodeEditor() {
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
            />
    );
}

export default CodeEditor;