import { Request, Response } from 'express';
import Note from '../models/Note.js';


interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const getNotes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const notes = await Note.find({ userId: req.user?.id });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createNotes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const note = await Note.create({
      userId: req.user?.id,
      content: req.body.content,
    });
    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    await Note.deleteOne({
      _id: req.params.id,
      userId: req.user?.id,
    });
    res.json({ message: 'Note deleted' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

