import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import File from "./File";

function EditorSidebar() {
    return (
        <div className="bg-[#0A0A0A] p-4 border-[rgba(255, 255, 255, 0.6)] border-[1px] border-t-0">
            <header className="mb-8">
                <Button variant='outline' className="w-full">
                    <i className='bx bx-plus' ></i>
                    Create New File
                </Button>
            </header> 

            <section className="flex flex-col gap-2">
                <header className="font-bold text-normal flex justify-between items-center">
                    <span>Explorer</span>
                    <i className='bx bx-dots-horizontal-rounded'></i>
                </header>

                <File fileExtension="html" fileName="test.html" />
                <File fileExtension="php" fileName="editor.php" />
                <File fileExtension="go" fileName="about-us.go" />
                <File fileExtension="javascript" fileName="contact.js" />
            </section>
        </div>
    );
}

export default EditorSidebar;