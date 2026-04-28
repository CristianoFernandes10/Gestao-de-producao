import express from 'express'
const router = express.Router()
import { createUser } from '../Controllers/userController.js'
import { asyncHandler} from '../Utils/asyncHandler.js'
router.post('/', asyncHandler(createUser))

export default router