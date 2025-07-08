import mongoose, { Schema } from "mongoose";

const userSchema=new Schema({
    name:{type:String,required:true},
    dob:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    otp:{type:String,required:true}
},{timestamps:true});

const User=mongoose.model('User',userSchema);

export default User;