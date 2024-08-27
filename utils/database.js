import mongoose from "mongoose";

let isCOnnected = false;
export const connectToDB = async () =>{
    mongoose.set('strictQuery',true);
    if(isCOnnected){
        console.log("DB is already connected");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "share_prompt",
            serverSelectionTimeoutMS: 3000, // Increase timeout to 30 seconds
        }),
        isCOnnected = true;
        console.log('MongoDB connected');
    }catch(error){
        console.log(error);
    }
}