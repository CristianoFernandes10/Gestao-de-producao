import express from 'express'
const router = express.Router()
import  { createProduct, getAllProducts, getProductById}  from '../Controllers/Product/createProductController.js'
import { asyncHandler} from '../Utils/asyncHandler.js'
router.post('/', asyncHandler(createProduct))

router.get('/', asyncHandler(getAllProducts))
router.get('/:id', asyncHandler(getProductById))


export default router