import express from 'express'
const router = express.Router()
import { updateStatusAndProductStock, getProductStock } from '../Controllers/Product/createProductController.js'
import { asyncHandler } from '../Utils/asyncHandler.js'
import { auth } from '../Middlewares/auth.js'
import { authRole } from '../Middlewares/authRole.js'
router.post('/', auth, authRole(['SUPER', 'PRD']), asyncHandler(updateStatusAndProductStock))
router.get('/', auth, authRole(['SUPER', 'PRD']), asyncHandler(getProductStock))
export default router