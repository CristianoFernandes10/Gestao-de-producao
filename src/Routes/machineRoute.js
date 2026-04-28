import express from 'express'
const router = express.Router()
import { createMachines, getAllMachines } from '../Controllers/machineController.js'
import { asyncHandler } from '../Utils/asyncHandler.js'
router.post('/', asyncHandler(createMachines))

router.get('/', asyncHandler(getAllMachines))


export default router
