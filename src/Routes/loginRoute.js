import express from 'express'
const router = express.Router()
import { loginController } from '../Controllers/loginController.js'
import { asyncHandler } from '../Utils/asyncHandler.js'
router.post('/', asyncHandler(loginController))

export default router