import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();



const DbUrl = process.env.DB_URL

export const connectDb = async () => {
    mongoose.connect(DbUrl!).then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    })
}
