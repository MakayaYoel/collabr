'use client';

import EditorLanguageDropdown from "./LanguageDropdown";
import { Button } from "@/components/ui/button";
import EditorNavigationOption from "./NavigationOption";
import { useEditorContext } from "@/app/context/EditorContext";
import { useSocketContext } from "@/app/context/SocketContext";
import { SocketEvent } from "@/lib/socketEvents";

function EditorNaviation() {
    const { code, setCodeOutput } = useEditorContext();
    const { socket } = useSocketContext();

    const runCode = async () => {
        try {
            if(code == undefined || !code.trim()) {
                throw new Error('No code inputted.');
            }
            
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ language: 'javascript', code })
            });
    
            const result = await response.json();
            setCodeOutput(result.output);
        } catch (error) {
            setCodeOutput((error as Error).message);
        }
    };

    const leaveRoom = () => socket.emit(SocketEvent.LEAVE_ROOM);

    return (
        <div className="bg-[#0A0A0A] border-b-[1px] border-b-[rgba(255, 255, 255, 0.6)] p-6 h-[95px]">
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    <Button variant='outline' className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer" onClick={leaveRoom}>
                        <i className='bx bx-home text-xl'></i>
                    </Button>

                    <div className="h-[40px] w-[1px] border-[1px] border-[rgba(255, 255, 255, 0.6)]"></div>

                    <div className="flex gap-6">
                        <EditorNavigationOption iconClassName="bx bx-code" optionName="Run Code" onClick={runCode} />
                        <EditorNavigationOption iconClassName="bx bxs-user" optionName="Participants"  onClick={runCode} />
                        <EditorNavigationOption iconClassName="bx bxs-chat" optionName="Chat"  onClick={runCode} />
                    </div>
                </div>
                
                <EditorLanguageDropdown />
            </div>
        </div>
    );
}

export default EditorNaviation;