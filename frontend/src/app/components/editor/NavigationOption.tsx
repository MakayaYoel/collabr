'use client';

import { Button } from "@/components/ui/button";

type EditorNavigationOptionProps = {
    iconClassName: string;
    optionName: string;
    onClick: () => void;
};

function EditorNavigationOption({ iconClassName, optionName, onClick } : EditorNavigationOptionProps) {
    return (
        <div className="flex items-center gap-3">
            <Button variant='outline' onClick={onClick} className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer bg-neutral-500 text-black">
                <i className={`${iconClassName} text-xl`} ></i>
            </Button>

            <span className="text-sm text-neutral-400">
                { optionName }
            </span>
         </div>
    );
}

export default EditorNavigationOption;