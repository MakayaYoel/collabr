import TestingUsername from "@/app/components/forms/test";

async function EditorPage({ params } : { params: Promise<{ roomID: string }> }) {
    const { roomID } = await params;
    
    return (
        <div>
            HELLO: {roomID}

            <TestingUsername />
        </div>
    );
}

export default EditorPage;