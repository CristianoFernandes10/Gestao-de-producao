import { ValidationError } from "../Errors/ValidationError.js"
import { insertOrder } from "../Helpers/productionOrderHelper.js"
import { NotFoundError } from "../Errors/NotFoundError.js"
import { verifica } from "../Helpers/Product/skuVerifyHelper.js"
import { verificaId } from "../Helpers/Machine/machineIdVerify.helper.js"
import { get } from "../Helpers/productionOrderHelper.js"


export const createOrder = async ({sku, machine_id, quantity}) =>{

    if(machine_id <=0 || quantity <= 0){
        throw new ValidationError('machine_id e quantity devem ser numeros inteiros maiores que zero')
    }

    if(sku.trim() === "") throw new ValidationError("O campo sku não pode conter espaços")

    const verificaSKU = await verifica(sku)
    if(!verificaSKU) throw new NotFoundError('SKU inválido ou inexistente')

    const verificaMachineId = await verificaId(machine_id)
    if(!verificaMachineId) throw new NotFoundError('Id inválido ou inexistente')


        
    const machineID = `M${machine_id.toString().padStart(4, '0')}`

    const date = new Date()
    const ano = date.getFullYear().toString().slice(-2)
    const mes = (date.getMonth() + 1).toString().padStart(2, "0")
    const dia = date.getDate().toString().padStart(2, '0')
    const time = `${date.getHours().toString()}${date.getMinutes().toString()}`

    const data = `${ano}${mes}${dia}${time}`

        
    const batch = `${sku}-${machineID}${data}`
    const result = await insertOrder({sku, machine_id, quantity, batch})
    return result

}



export const getOrders = async (status) => {


    let queries = `WHERE 1=1`
    const params = [] 
    
    if(status){
       queries += ` AND production_order.status LIKE ?`
        params.push(`%${status}%`)
    }


    const result = await get(queries,params)
    return result
}




export const getOrderId = async(id)=>{
    if(id <=0) throw new ValidationError('ID deve ser inteiro maior que zero')

    let queries = `WHERE production_order.id = ?`
    
    const result = await get(queries, [id])

    return result
}
