import Note from "../models/Note.js"

export const getNotes=async(req,res)=>{
    const notes=await Note.find({userId:req.user.id});
    res.json(notes);
};

export const createNotes=async(req,res)=>{
    const note=await Note.create({userId:req.user.id,content:req.body.content});
    res.status(201).json(note);
};

export const deleteNote=async(req,res)=>{
    await Note.deleteOne({_id:req.params.id, userId:req.user.id});
    res.json({message:'Note deleted'});
};