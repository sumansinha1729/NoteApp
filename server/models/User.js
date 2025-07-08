import mongoose, { Schema } from "mongoose";

const userSchema=new Schema({
    name:{type:String},
    dob:{type:String},
    email:{type:String,unique:true,required:true},
    otp:{type:String}
},{timestamps:true});

const User=mongoose.model('User',userSchema);

export default User;