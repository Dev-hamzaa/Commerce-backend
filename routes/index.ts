import express from 'express';

import authRouter from './auth'

import userRouter from "./user";
import productRouter from './product'
import categorRouter from './category'

const router = express.Router();


router.use("/auth", authRouter)
router.use('/user', userRouter)
router.use('/category', categorRouter)
router.use('/product', productRouter)



export default router;