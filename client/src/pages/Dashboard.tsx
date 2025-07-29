import React, { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

interface Note {
  _id: string;
  content: string;
}

interface User {
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await API.get<User>('/auth/me');
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user data: ', error);
      alert('Failed to load user info');
    }
  };

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
    fetchUser();
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-white flex justify-center font-['Inter']">
      <div className="relative w-full max-w-[375px] md:max-w-4xl bg-white overflow-hidden border md:border-[#333] md:rounded-[9px]">
        {/* Native Status Bar (Mobile Only) */}
        <img src="/StatusBar.svg" alt="Status Bar" className="w-full h-[44px] block md:hidden" />

        {/* Top Bar */}
        <div className="w-full px-4 mt-[60px] md:mt-[40px] flex justify-between items-center">
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
        <div className="px-4 mt-4">
          <p className="text-[16px] text-[#232323] font-medium">Welcome, {user?.name || 'User'}!</p>
          <p className="text-[14px] text-gray-500">Email: {user?.email || 'Loading...'}</p>
        </div>

        {/* Input Box */}
        <div className="mt-4 mx-4 border border-[#D9D9D9] rounded-[10px] p-4 shadow-md">
          <textarea
            className="w-full h-[100px] resize-none focus:outline-none text-sm text-[#232323]"
            placeholder="Write your note..."
            value={text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          ></textarea>
        </div>

        {/* Create Note Button */}
        <div className="mx-4 mt-4">
          <button
            onClick={addNote}
            className="w-full h-[52px] bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Create Note
          </button>
        </div>

        {/* Notes Label */}
        <h2 className="px-4 mt-6 text-[20px] font-medium text-[#232323]">Notes</h2>

        {/* Notes List */}
        <div className="mx-4 mt-4 max-h-[300px] md:max-h-[500px] overflow-y-auto flex flex-col gap-4 pr-1">
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

        {/* Native Home Indicator (Mobile Only) */}
        <div className="block md:hidden">
          <img
            src="/HomeIndicator.svg"
            alt="Home Indicator"
            className="w-full h-[34px] absolute bottom-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
