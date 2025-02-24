import { Card } from "@/components/ui/card";
import EditorLanguageDropdown from "./LanguageDropdown";
import { Button } from "@/components/ui/button";

function EditorNaviation() {
    return (
        <div className="h-[100px] bg-[#111111] p-6">
            <div className="flex justify-between items-center">
                <div className="flex">
                    <Button variant='outline' className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
                        <i className='bx bx-home text-xl'></i>
                    </Button>
                </div>
                
                <EditorLanguageDropdown />
            </div>
        </div>
    );
}

export default EditorNaviation;