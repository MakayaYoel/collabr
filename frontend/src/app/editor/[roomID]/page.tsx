import CodeEditor from "@/app/components/editor/CodeEditor";

async function EditorPage({ params } : { params: Promise<{ roomID: string }> }) {
    const { roomID } = await params;
    
    return (
        <main className="flex">
            <div className="h-screen bg-black w-[300px] rounded-lg"></div>
            <CodeEditor />
            <div className="h-screen bg-black w-[300px] rounded-lg"></div>
        </main>
    );
}

export default EditorPage;