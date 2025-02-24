import CodeEditor from "@/app/components/editor/CodeEditor";
import EditorNaviation from "@/app/components/editor/Navigation";

async function EditorPage({ params } : { params: Promise<{ roomID: string }> }) {
    const { roomID } = await params;
    
    return (
        <main>
            <EditorNaviation />
        </main>
    );
}

export default EditorPage;