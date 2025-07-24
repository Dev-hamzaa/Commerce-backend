import express from 'express'
import { categoryController } from '../controller/Category';


const router = express.Router();




router.route('/').post(categoryController.createCategory)
router.route('/').get(categoryController.getAllCategories)
router.route('/:id').get(categoryController.getCategoryById)
router.route('/:id').put(categoryController.updateCategory)
router.route('/:id').delete(categoryController.deleteCategory)


export default router;

