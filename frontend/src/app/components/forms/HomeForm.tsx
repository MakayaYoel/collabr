"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from 'uuid';
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";

function HomeForm() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { setUsername, setRoomId } = useAppContext();

    const generateUUID = () => {
        const roomIDInput = document.getElementById('roomID') as HTMLFormElement;
        roomIDInput.value = uuid();
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        
        const roomID = (document.getElementById('roomID') as HTMLFormElement).value as string;
        const username = (document.getElementById('username') as HTMLFormElement).value as string;

        if(roomID.length == 0 || username.length == 0) {
            setError('Please enter a room ID and username.');
            return;
        }

        setUsername(username);
        setRoomId(roomID);
        router.push(`/editor/${roomID}`);
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            { error && <span className="text-red-500 text-sm text-center">{error}</span>}
            <section>
                <Label htmlFor="roomID">Room ID</Label>

                <div className="flex gap-2">
                    <Input id="roomID" placeholder="Enter a Room ID..." autoComplete="off" />
                    <Button onClick={generateUUID} type='button' variant="outline">Generate</Button>
                </div>
            </section>
            
            <section>
                <Label htmlFor="username">Username</Label>
                <Input name="username" id="username" placeholder="Enter a Username..." autoComplete="off" />
            </section>
        
            <Button type='submit' variant="outline" className="w-full">Create/Join Room</Button>
        </form>
    );
}

export default HomeForm;