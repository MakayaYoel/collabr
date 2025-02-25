'use client';

import { useEditorContext } from "@/app/context/EditorContext";

function EditorCodeOutput() {
    const { codeOutput } = useEditorContext();

    return (
        <div className="bg-[rgba(0, 0, 0, 0.5)] p-12">
            <p>Your Code Output: {codeOutput}</p>
        </div>
    );
}

export default EditorCodeOutput;