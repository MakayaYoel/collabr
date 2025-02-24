import { Card } from "@/components/ui/card";
import EditorLanguageDropdown from "./LanguageDropdown";
import { Button } from "@/components/ui/button";
import EditorNavigationOption from "./NavigationOption";

function EditorNaviation() {
    return (
        <div className="bg-[#0A0A0A] border-b-[1px] border-b-[rgba(255, 255, 255, 0.6)] p-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    <Button variant='outline' className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
                        <i className='bx bx-home text-xl'></i>
                    </Button>

                    <div className="h-[40px] w-[1px] border-[1px] border-[rgba(255, 255, 255, 0.6)]"></div>

                    <div className="flex gap-6">
                        <EditorNavigationOption iconClassName="bx bx-code" optionName="Run Code" />
                        <EditorNavigationOption iconClassName="bx bxs-user" optionName="Participants" />
                        <EditorNavigationOption iconClassName="bx bxs-chat" optionName="Chat" />
                    </div>
                </div>
                
                <EditorLanguageDropdown />
            </div>
        </div>
    );
}

export default EditorNaviation;