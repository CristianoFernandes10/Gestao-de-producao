import { ValidationError} from '../../Errors/ValidationError.js'
import  { create, getProducts, getProductId, insertProductStock, getStock } from '../../Services/productService.js'





export const createProduct = async (req, res) =>{
    const {name, prefix} = req.body
    const validity = Number(req.body.validity)

    if(!name || !prefix || name.trim() === "" || prefix.trim() === "" || Number.isNaN(validity)){
        throw new ValidationError()
    }

    
    
    const result = await create({name, prefix, validity})
    return res.status(201).json(result)
}



export const getAllProducts = async (req, res) =>{
    const name = req.query.name
    const prefix = req.query.prefix
    const sku = req.query.sku


    const result = await getProducts({name, prefix, sku})
    return res.status(200).json({data: result})
}


export const getProductById = async (req, res) =>{
    const id = Number(req.params.id)
    
    if(Number.isNaN(id)) throw new ValidationError('Id deve ser um numero inteiro maior que zero')

    
    const result = await getProductId({id})
    return res.status(200).json({data: result})
}



export const updateStatusAndProductStock = async (req, res)=>{
    const {sku, batch} = (req.body)
    const quantity = Number(req.body.quantity)
    

    if(!sku || Number.isNaN(quantity) || !batch) throw new ValidationError()

    const result = await insertProductStock({sku, batch, quantity})

}

export const getProductStock = async (req, res) =>{
    const result = await getStock()
    return res.status(200).json({data: result})
}