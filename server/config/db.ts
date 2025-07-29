import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error: unknown) {
    const err = error as Error;
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
