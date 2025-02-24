import CodeEditor from "@/app/components/editor/CodeEditor";
import EditorNaviation from "@/app/components/editor/Navigation";
import EditorSidebar from "@/app/components/editor/Sidebar";
import { Button } from "@/components/ui/button";

async function EditorPage({ params } : { params: Promise<{ roomID: string }> }) {
    const { roomID } = await params;
    
    return (
        <main className="h-screen bg-black">
            <EditorNaviation />

            <section className='grid h-full' style={{ gridTemplateColumns: '1fr 4fr'}}>
                <EditorSidebar />
                
                <div className="">

                </div>
            </section>
        </main>
    );
}

export default EditorPage;