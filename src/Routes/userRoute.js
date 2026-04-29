import express from 'express'
const router = express.Router()
import { createUser } from '../Controllers/userController.js'
import { asyncHandler } from '../Utils/asyncHandler.js'
import { auth } from '../Middlewares/auth.js'
import { authRole } from '../Middlewares/authRole.js'
router.post('/',auth, authRole(['SUPER']), asyncHandler(createUser))

export default router