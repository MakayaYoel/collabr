import { Button } from "@/components/ui/button";
import File from "./File";
import EditorUserProfile from "./UserProfile";

function EditorSidebar() {
    return (
        <div className="bg-[#0A0A0A] p-4 border-[rgba(255, 255, 255, 0.6)] border-[1px] border-t-0 h-max-content">
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

                <div className="pl-4">
                    <File fileExtension="php" fileName="index.php" />
                    <File fileExtension="go" fileName="main.go" />
                    <File fileExtension="javascript" fileName="app.js" />
                    <File fileExtension="typescript" fileName="dashboard.ts" />
                    <File fileExtension="py" fileName="server.py" />
                    <File fileExtension="php" fileName="auth.php" />
                    <File fileExtension="go" fileName="handler.go" />
                    <File fileExtension="javascript" fileName="utils.js" />
                    <File fileExtension="typescript" fileName="types.ts" />
                    <File fileExtension="py" fileName="config.py" />
                </div>

                <EditorUserProfile />
            </section>
        </div>
    );
}

export default EditorSidebar;