import { auth } from "@/auth";
const page = async () => {
    const session = await auth();

    return (
        <div>
            <h1 className="text-2xl font-bold">{JSON.stringify(session)}</h1>
        </div>
    );
};

export default page;
