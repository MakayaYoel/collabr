'use client';

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
import { useState } from "react";

function EditorLanguageDropdown() {
    const [language, setLanguage] = useState("javascript")
 
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