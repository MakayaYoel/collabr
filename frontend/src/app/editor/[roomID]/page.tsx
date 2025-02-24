import CodeEditor from "@/app/components/editor/CodeEditor";
import EditorNaviation from "@/app/components/editor/Navigation";
import EditorSidebar from "@/app/components/editor/Sidebar";
import { Button } from "@/components/ui/button";

async function EditorPage({ params } : { params: Promise<{ roomID: string }> }) {
    const { roomID } = await params;
    
    return (
        <main className="h-screen bg-black">
            <EditorNaviation />

            <section className='grid h-[calc(100vh-95px)]' style={{ gridTemplateColumns: '1fr 4fr'}}>
                <EditorSidebar />
                
                <div className="grid h-full" style={{ gridTemplateRows: '3fr 1fr'}}>
                    <CodeEditor />

                    <div className="bg-[rgba(0, 0, 0, 0.5)] flex items-center justify-center">
                        <h1 className="font-bold text-2xl text-white">Coming Soon...</h1>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default EditorPage;