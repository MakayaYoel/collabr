import { Button } from "@/components/ui/button";

type FileProps = {
    fileExtension: string;
    fileName: string;
};

const extensionToIcon = (extension: string) => ({
    'html': 'html5',
    'php': 'php',
    'go': 'go-lang',
    'typescript': 'typescript',
    'javascript': 'javascript'
})[extension];

function File({ fileExtension, fileName }: FileProps) {
    return (
        <div className="flex items-center mt-6 justify-between">
            <div>
                <Button className="h-[35px] w-[35px] mr-4" variant='outline'>
                    <i className={`bx bxl-${extensionToIcon(fileExtension)}`} ></i>
                </Button>

                <span className="hover:underline cursor-pointer">{ fileName }</span>
            </div>

            <i className='bx bx-dots-horizontal-rounded cursor-pointer'></i>
        </div>
    );
}

export default File;