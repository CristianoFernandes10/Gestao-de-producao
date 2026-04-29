import express from 'express'
const router = express.Router()
import  { createProduct, getAllProducts, getProductById}  from '../Controllers/Product/createProductController.js'
import { asyncHandler } from '../Utils/asyncHandler.js'
import { auth } from '../Middlewares/auth.js'
import { authRole } from '../Middlewares/authRole.js'
router.post('/', auth, authRole(['SUPER']), asyncHandler(createProduct))

router.get('/', auth, asyncHandler(getAllProducts))
router.get('/:id', auth, asyncHandler(getProductById))


export default router