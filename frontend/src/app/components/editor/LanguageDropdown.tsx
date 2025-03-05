'use client';

import { useEditorContext } from "@/app/context/EditorContext";
import { useSocketContext } from "@/app/context/SocketContext";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SocketEvent } from "@/lib/socketEvents";

function EditorLanguageDropdown() {
    const { language } = useEditorContext();
    const { socket } = useSocketContext();

    const setLanguage = (language: string) => {
      socket.emit(SocketEvent.CHANGE_LANGUAGE, { language });
    };
 
    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Language: {language}</Button>
          </DropdownMenuTrigger>
      
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
              <DropdownMenuRadioItem value="javascript">JavaScript</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="python">Python</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="typescript">TypeScript</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="php">PHP</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="go">Go</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
}

export default EditorLanguageDropdown;