import React, { useEffect, useState, ChangeEvent } from 'react';
import API from '../services/api';

interface Note {
  _id: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState<string>('');

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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>

      <div className="mb-4">
        <textarea
          className="w-full border p-2 rounded-md"
          value={text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          placeholder="Write your note..."
        ></textarea>
        <button
          onClick={addNote}
          className="mt-2 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
        >
          Add Note
        </button>
      </div>

      <div>
        {notes.map((note) => (
          <div
            key={note._id}
            className="border p-3 mb-2 flex justify-between items-center rounded-md"
          >
            <p className="text-gray-800">{note.content}</p>
            <button
              onClick={() => deleteNote(note._id)}
              className="text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
