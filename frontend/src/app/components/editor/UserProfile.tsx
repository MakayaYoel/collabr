'use client';

import { useAppContext } from "@/app/context/AppContext";
import { Card } from "@/components/ui/card";

function EditorUserProfile() {
    const { username, roomId } = useAppContext();

    return ( 
        <Card className="p-4 mt-6">
            <p>
                <span className="font-bold">Room ID: </span>
                <span>{ roomId.length > 20 ? `${roomId.slice(0, 20)}...` : roomId }</span>
            </p>

            <p>
                <span className="font-bold">Connected as: </span>
                <span>{ username }</span>
            </p>
        </Card>
    );
}

export default EditorUserProfile;