'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function HomeButton() {
    const router = useRouter();

    return (
        <Button variant='outline' className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer" onClick={() => router.push('/')}>
            <i className='bx bx-home text-xl'></i>
        </Button>
    );
}

export default HomeButton;