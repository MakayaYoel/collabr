'use client';

import { useUserContext } from "@/app/context/UserContext";
import { toast } from "react-toastify";

function CopyToClipboard() {
    const { currentUser } = useUserContext();

    const onClick = () => {
        if(window !== undefined && window.navigator !== undefined) {
            navigator.clipboard.writeText(currentUser.roomId);
            toast.success('Copied Room ID to clipboard!');
        }
    };

    return ( 
        <i className='ml-2 bx bx-clipboard cursor-pointer' onClick={onClick}></i>
    );
}

export default CopyToClipboard;