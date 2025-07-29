import React, { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

interface Note {
  _id: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState<string>('');
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await API.get<Note[]>('/notes');
      setNotes(res.data);
    } catch (error) {
      console.error('Error while fetching notes: ', error);
      alert('Failed to fetch notes');
    }
  };

  const addNote = async () => {
    if (!text.trim()) return;
    try {
      await API.post('/notes', { content: text });
      setText('');
      fetchNotes();
    } catch (error) {
      console.error('Error while adding note: ', error);
      alert('Failed to add note');
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error while deleting note: ', error);
      alert('Failed to delete note');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="w-[375px] min-h-screen bg-white border border-[#232323] rounded-[9px] mx-auto relative overflow-hidden">
      {/* Status Bar */}
      <img src="/StatusBar.svg" alt="Status Bar" className="w-full h-[44px] absolute top-0 left-0" />

      {/* Top Bar */}
      <div className="absolute top-[60px] left-0 w-full px-4 flex justify-between items-center">
        <img src="/top1.svg" alt="Top1" className="h-[32px]" />
        <h1 className="text-[20px] font-medium text-[#232323]">Dashboard</h1>
        <span
          className="text-[14px] font-semibold underline text-[#232323] cursor-pointer"
          onClick={() => navigate('/signin')}
        >
          Sign Out
        </span>
      </div>

      {/* Welcome Message */}
      <div className="absolute top-[104px] left-[16px] mt-2 ">
        <p className="text-[16px] text-[#232323] font-medium">Welcome, Suman Sinha !</p>
        <p className="text-[14px] text-gray-500">Email: suman@example.com</p>
      </div>

      {/* Input Box */}
      <div className="absolute top-[150px] left-[16px] w-[343px] h-[130px] border border-[#D9D9D9] rounded-[10px] p-4 shadow-md mt-4 flex">
        <textarea
          className="w-full h-full resize-none focus:outline-none text-sm text-[#232323]"
          placeholder="Write your note..."
          value={text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        ></textarea>
      </div>

      {/* Create Note Button */}
      <div className="absolute top-[295px] left-[16px] w-[343px] mt-2">
        <button
          onClick={addNote}
          className="w-full h-[52px] bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Create Note
        </button>
      </div>

      {/* Notes Label */}
      <h2 className="absolute top-[365px] left-[16px] text-[20px] font-medium text-[#232323] mt-1">
        Notes
      </h2>

      {/* Notes List */}
      <div className="absolute top-[405px] left-[16px] w-[343px] max-h-[300px] overflow-y-auto flex flex-col gap-4 pr-1 mt-2">
        {notes.map((note) => (
          <div
            key={note._id}
            className="w-full min-h-[50px] border border-[#D9D9D9] shadow-sm rounded-[10px] px-4 py-2 flex justify-between items-start bg-white"
          >
            <p className="text-[#232323] text-sm break-words whitespace-pre-wrap">{note.content}</p>
            <img
              src="/deleteIcon.svg"
              alt="Delete"
              className="w-5 h-5 cursor-pointer mt-1"
              onClick={() => deleteNote(note._id)}
            />
          </div>
        ))}
      </div>

      {/* Native Home Indicator */}
      <img
        src="/HomeIndicator.svg"
        alt="Home Indicator"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[375px] h-[34px]"
      />
    </div>
  );
};

export default Dashboard;
