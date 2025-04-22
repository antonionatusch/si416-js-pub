import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log('DB_MONGO from .env:', process.env.DB_MONGO);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error when trying to connect to MongoDB database: ');
    console.error(error);
  }
};

export default connectDB;
