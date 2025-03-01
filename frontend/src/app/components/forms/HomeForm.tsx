"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from 'uuid';
import { FormEvent, useEffect, useRef, useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useSocketContext } from "@/app/context/SocketContext";
import { SocketEvent } from "@/lib/socketEvents";
import { UserStatus } from "@/lib/userStatuses";

function HomeForm() {
    const [error, setError] = useState<string | null>(null);
    const { setCurrentUser, currentUser, setCurrentStatus, currentStatus } = useUserContext();
    const { socket } = useSocketContext();
    const roomIdInputRef = useRef<HTMLInputElement | null>(null);
    const usernameInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const generateUUID = () => {
        if(!roomIdInputRef.current) return "";

        roomIdInputRef.current.value = uuid();
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if(!roomIdInputRef.current || !usernameInputRef.current) return;
        
        const roomId = roomIdInputRef.current.value;
        const username = usernameInputRef.current.value;

        if(!roomId.trim() || !username.trim()) {
            setError('Please enter a room ID and username.');
            return;
        }

        socket.emit(SocketEvent.ATTEMPT_JOIN, { roomId, username });
    };

    useEffect(() => {
        if(currentStatus == UserStatus.JOINED_ROOM) {
            router.push(`/editor/${currentUser.roomId}`);
        } else if(currentStatus == UserStatus.DISCONNECTING) {
            setCurrentUser({ username: '', roomId: ''});
            setCurrentStatus(UserStatus.IDLE);
        }
    }, [currentStatus]);

    return (
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            { error && <span className="text-red-500 text-sm text-center">{error}</span>}
            <section>
                <Label htmlFor="roomId">Room ID</Label>

                <div className="flex-col flex gap-2 sm:flex-row">
                    <Input
                        id="roomId"
                        placeholder="Enter a Room ID..." 
                        autoComplete="off"
                        ref={roomIdInputRef}
                    />
                    <Button onClick={generateUUID} type='button' variant="outline">Generate</Button>
                </div>
            </section>
            
            <section>
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    placeholder="Enter a Username..." 
                    autoComplete="off" 
                    ref={usernameInputRef}
                />
            </section>
        
            <Button type='submit' variant="outline" className="w-full">Create/Join Room</Button>
        </form>
    );
}

export default HomeForm;