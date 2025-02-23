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
            <div className="sm:p-8 flex flex-col items-center">
                <div className="text-center mb-8">
                    <h1 className="text-white font-bold text-4xl">
                        collabr
                    </h1>
                    <span className="text-[#4d4d4d]">yet another real-time coding platform.</span>
                </div>

                <Card className="w-full sm:w-[500px]">
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