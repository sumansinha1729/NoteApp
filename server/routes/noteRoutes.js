import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createNotes, deleteNote, getNotes } from '../controllers/noteController.js';

const noteRouter=express.Router();
noteRouter.use(authMiddleware);

noteRouter.get('/',getNotes);
noteRouter.post('/',createNotes);
noteRouter.delete('/:id',deleteNote);

export default noteRouter;