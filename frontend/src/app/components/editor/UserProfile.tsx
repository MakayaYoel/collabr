import { Card } from "@/components/ui/card";

function EditorUserProfile() {
    return ( 
        <Card className="p-4 mt-6">
            <p>
                <span className="font-bold">Room ID: </span>
                <span>[Room ID Here]</span>
            </p>

            <p>
                <span className="font-bold">Connected as: </span>
                <span>[Username Here]</span>
            </p>
        </Card>
    );
}

export default EditorUserProfile;