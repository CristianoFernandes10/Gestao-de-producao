import express from 'express'
const router = express.Router()
import { createProductionOrder, gerProductionOrdersById, getProductionOrders } from '../Controllers/productionOrderController.js'
import { asyncHandler } from '../Utils/asyncHandler.js'

router.post('/', asyncHandler(createProductionOrder))
router.get('/', asyncHandler(getProductionOrders))
router.get('/:id', asyncHandler(gerProductionOrdersById))
export default router