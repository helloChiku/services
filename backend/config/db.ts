import mongoose from 'mongoose';
import {startServer} from './server';
import { Express } from 'express';
export const connectDB = async (app: Express) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'appointment_scheduler'
    });

    console.log('MongoDB connected');
    startServer(app)
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
