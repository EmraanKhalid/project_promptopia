import { NextResponse } from "next/server"
import { connectToDB } from "@utils/database";
import Prompt from "@models/pormpt";

export const POST = async (req) => {
    const {userId, prompt,tag} = await req.json();
    try{
        await connectToDB();
        const newPrompt = new Prompt ({creator: userId, prompt, tag});
        await newPrompt.save();
        // return Response(JSON.stringify(newPrompt),{
        //     status:201
        // })
        return NextResponse.json(JSON.stringify(newPrompt),{status:201});
    }catch(error){
        console.log(error);
        return NextResponse.json("Failed to create New Prompt",{ status: 500 })
    }
}