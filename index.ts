import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { connectDb } from './config';
import cors from 'cors'
import { errorHandler, errorMiddleware } from './middleware/errorHandler';
import mainRouter from './routes/index';
import authMiddleware from './middleware/authMiddleware';
import { logger } from './utility/logger';
dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.get('/', (req, res) => {
    res.send('Commerce-Backend v=>1.0 ');
});

app.use(logger)
app.use(authMiddleware)
app.use('/api', mainRouter)
app.use(errorMiddleware)

const startServer = async () => {
    // Connect Database
    await connectDb();

    app.listen(port, () => {
        console.log(`Server is running on port ${port} `);
    });

}

startServer();

