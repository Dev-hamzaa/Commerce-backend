import express from 'express'
import { userController } from '../controller/user';


const router = express.Router();




router.post('/login', userController.Login)
router.post('/signup', userController.createUser)


export default router;

