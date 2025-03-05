import { User } from "@/app/types/types";
import { truncateString } from "@/lib/utils";

export default function Participant({ user }: { user: User }) {
    const username = user.username;

    return (
        <div className="flex flex-col items-center">
            <div className={`h-[50px] w-[50px] rounded-lg bg-gray-500 font-bold text-2xl flex justify-center items-center mb-2`}>
                {username ? username[0].toUpperCase() : '...'}
            </div>
            <span className="text-xs">{username ? truncateString(username, 15) : 'Loading...'}</span>
        </div>
    );
}
