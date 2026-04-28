import { ValidationError } from "../Errors/ValidationError.js";
import { createOrder, getOrderId } from "../Services/productionOrderService.js";
import { getOrders } from "../Services/productionOrderService.js";

export const createProductionOrder = async (req, res)=>{
    const {sku} = req.body
    const machine_id = Number(req.body.machine_id)
    const quantity = Number(req.body.quantity)

    console.log(sku, machine_id, quantity)

    if(!sku || Number.isNaN(machine_id) || Number.isNaN(quantity)){
        throw new ValidationError()
    }

    const result = await createOrder({sku, machine_id, quantity})
    res.status(201).json({
        message: 'Ordem de produção criada com sucesso',
        data: result
    })


}


export const getProductionOrders = async (req, res)=>{
    const status = req.query.status
    
    
    
    
    const result = await getOrders(status)
    return res.status(200).json({data: result})
}


export const gerProductionOrdersById = async(req, res)=>{
    const id = Number(req.params.id)
    if(Number.isNaN(id)) throw new ValidationError('ID deve ser inteiro maior que zero')

    const result = await getOrderId(id)
    return res.status(200).json({data: result})

    
}



