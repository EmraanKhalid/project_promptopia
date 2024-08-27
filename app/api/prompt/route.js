import { connectToDB } from "@utils/database";
import Prompt from "@models/pormpt";


export const GET = async (request) =>{
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts),{success:200})
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompts",{success:500})
    }
}