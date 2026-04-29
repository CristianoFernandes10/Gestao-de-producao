import express from 'express'
const router = express.Router()
import { createProductionOrder, gerProductionOrdersById, getProductionOrders } from '../Controllers/productionOrderController.js'
import { asyncHandler } from '../Utils/asyncHandler.js'
import {auth} from '../Middlewares/auth.js'
import { authRole } from '../Middlewares/authRole.js'

router.post('/', auth, authRole(['SUPER']), asyncHandler(createProductionOrder))
router.get('/', auth, asyncHandler(getProductionOrders))
router.get('/:id', auth, asyncHandler(gerProductionOrdersById))
export default router