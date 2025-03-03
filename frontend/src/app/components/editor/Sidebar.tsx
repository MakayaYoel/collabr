'use client';

import { useEditorContext } from "@/app/context/EditorContext";
import EditorUserProfile from "./UserProfile";
import { User } from "@/app/types/types";
import Participant from "./Participant";
import { useUserContext } from "@/app/context/UserContext";

function EditorSidebar() {
    const { currentUser } = useUserContext();
    const { remoteUsers } = useEditorContext();

    return (
        <div className="bg-[#0A0A0A] p-4 border-[rgba(255, 255, 255, 0.6)] border-[1px] border-t-0 h-max-content">

            <section className="flex flex-col gap-2">
                <header className="font-bold text-normal">
                    Room Participants
                </header>

                <div className="flex flex-wrap mt-3 gap-2">
                    <Participant user={currentUser} />
                    {remoteUsers.map((user: User) => {
                        return (
                            <Participant key={user.username} user={user} />
                        )
                    })}
                </div>

                <EditorUserProfile />
            </section>
        </div>
    );
}

export default EditorSidebar;