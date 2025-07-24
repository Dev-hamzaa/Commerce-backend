import express from 'express'
import { userController } from '../controller/user';


const router = express.Router();




router.post('/login', userController.Login)


export default router;

