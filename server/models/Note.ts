import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INote extends Document {
  content: string;
  userId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const noteSchema: Schema<INote> = new Schema(
  {
    content: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Note: Model<INote> = mongoose.model<INote>('Note', noteSchema);

export default Note




