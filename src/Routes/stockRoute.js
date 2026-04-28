import express from 'express'
const router = express.Router()
import { updateStatusAndProductStock, getProductStock } from '../Controllers/Product/createProductController.js'
import { asyncHandler } from '../Utils/asyncHandler.js'
router.post('/', asyncHandler(updateStatusAndProductStock))
router.get('/', asyncHandler(getProductStock))
export default router