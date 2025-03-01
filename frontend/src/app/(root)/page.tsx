import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import HomeForm from "../components/forms/HomeForm";

function Home() {
    return (
        <main className="h-screen bg-[#111111] flex justify-center items-center">
            <div className="flex flex-col items-center w-full mx-4 sm:m-0">
                <div className="text-center mb-8">
                    <h1 className="text-white font-bold text-4xl">
                        collabr
                    </h1>
                    <span className="text-[#4d4d4d]">yet another real-time coding platform.</span>
                </div>

                <Card className="w-full sm:w-[500px] sm:px-2">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Create/Join a Room</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <HomeForm />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

export default Home;