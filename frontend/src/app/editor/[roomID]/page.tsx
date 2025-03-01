import CodeEditor from "@/app/components/editor/CodeEditor";
import EditorCodeOutput from "@/app/components/editor/CodeOutput";
import EditorNaviation from "@/app/components/editor/Navigation";
import EditorSidebar from "@/app/components/editor/Sidebar";

async function EditorPage({ params } : { params: Promise<{ roomID: string }> }) {
    const { roomID } = await params;
    
    return (
        <main className="h-screen bg-black">
            <EditorNaviation />

            <section className='grid h-[calc(100vh-95px)]' style={{ gridTemplateColumns: '1fr 4fr'}}>
                <EditorSidebar />
                
                <div className="grid h-full" style={{ gridTemplateRows: '3fr 1fr'}}>
                    <CodeEditor />

                    <EditorCodeOutput />
                </div>
            </section>
        </main>
    );
}

export default EditorPage;