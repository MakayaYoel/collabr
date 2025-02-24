"use client";

import { useEffect, useState } from "react";

function TestingUsername() {
    const [username, setUsername] = useState<string | null>();

    useEffect(() => {
        const fetchUsername = async () => {
            if(typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
                setUsername(localStorage.getItem('username'));
            }
        };
 
        fetchUsername();
    }, []);

    return (
        <h1>Your Username is: {username ?? 'Not set.'}</h1>
    );
}

export default TestingUsername;