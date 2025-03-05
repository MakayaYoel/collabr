'use client';

import { useUserContext } from "@/app/context/UserContext";
import { Card } from "@/components/ui/card";
import CopyToClipboard from "./CopyToClipboard";
import { truncateString } from "@/lib/utils";

function EditorUserProfile() {
    const { currentUser } = useUserContext();
    const { roomId, username } = currentUser;

    return ( 
        <Card className="p-4 mt-6">
            <p>
                <span className="font-bold">Room ID: </span>
                <span>{ truncateString(roomId, 20) }</span>
                <CopyToClipboard />
            </p>

            <p>
                <span className="font-bold">Connected as: </span>
                <span>{ username }</span>
            </p>
        </Card>
    );
}

export default EditorUserProfile;