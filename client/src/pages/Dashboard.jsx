import React, { useEffect, useState } from 'react'
import API from '../services/api';

const Dashboard = () => {

    const [notes,setNotes]=useState([]);
    const [text,setText]=useState('');

    const fetchNotes=async()=>{
        try {
            const res=await API.get('/notes');
            setNotes(res.data)
        } catch (error) {
            console.log("Error while fetching notes, ",error);
            alert("Failed to fetch notes");
        }
    };

    const addNote=async()=>{
        try {
            await API.post('/notes',{content:text});
            setText('');
            fetchNotes()
        } catch (error) {
            console.log("Error while adding note, ",error);
            alert("Failed to add note");
        }
    };

    const deleteNote=async()=>{
        try {
            await API.delete(`/notes/${id}`);
            fetchNotes()
        } catch (error) {
            console.log("Error while deleting note, ",error);
            alert("Failed to delete note");
        }
    };

    useEffect(()=>{
        fetchNotes();
    },[])
  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>
        <div className='mb-4'>
            <textarea
            className='w-full border p-2'
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder='Write your note...'
            ></textarea>
            <button onClick={addNote} className='mt-2 bg-blue-600 text-white px-4 py-2'>Add Note</button>
        </div>

        <div>
            {
                notes.map((note)=>(
                    <div key={note._id} className='border p-3 mb-2 flex justify-between'>
                        <p>{note.content}</p>
                        <button onClick={()=>deleteNote(note._id)} className='text-red-500'>Delete</button>
                    </div>
                ))
            }
        </div>
      </h2>
    </div>
  )
}

export default Dashboard
