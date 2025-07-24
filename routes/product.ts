import express from 'express'
import multer, { FileFilterCallback, MulterError } from 'multer'
import path from 'path'
import { Request } from 'express'
import fs from 'fs'
import { productController } from '../controller/product'


const router = express.Router();


// first create a dir to store them in order to send them to server
const uploadsDir = path.join(__dirname, '../uploads');

if (fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.split('/')[0] == 'image') {
        cb(null, true)
    }
    else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"))
    }
}
const upload = multer(
    {
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: 10 * 1024 * 1024, // 5MB
            files: 1
        }

    }
)



router.post('/', productController.createProduct)
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductById)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)


export default router;



