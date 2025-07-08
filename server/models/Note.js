import mongoose, { Schema } from "mongoose";

const noteSchema=new Schema({
    content:{type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

const Note=mongoose.model('Note',noteSchema);

export default Note;