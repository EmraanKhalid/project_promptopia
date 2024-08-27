import { Schema,model,models } from "mongoose";

const UserSchema = new Schema({
    email:{
        type:String,
        unique:[true,'Email Alaready Exixts!'],
        required:[true,'Email is Required!']

    },
    username: {
        type: String,
        required:[true,'Username is Requiered'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image:{
        type:String,
    }
});


const User = models.users || model('users',UserSchema);
export default User;