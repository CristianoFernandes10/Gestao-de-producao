import express from 'express'
const router = express.Router()
import { createMachines, getAllMachines } from '../Controllers/machineController.js'
import { asyncHandler } from '../Utils/asyncHandler.js'
import { auth } from '../Middlewares/auth.js'

import { authRole } from '../Middlewares/authRole.js'
router.post('/', auth, authRole(['SUPER']), asyncHandler(createMachines))

router.get('/', auth, asyncHandler(getAllMachines))


export default router
