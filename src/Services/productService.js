import { pool } from "../../database/database.js";
import { ValidationError } from "../Errors/ValidationError.js";
import { insertProducts, get, getById, insertStock, stock} from "../Helpers/Product/productHelper.js";
import { getBySKU, updateStatus} from "../Helpers/productionOrderHelper.js";



export const create = async({name, prefix, validity})=>{

    if(prefix.length <= 2) throw new ValidationError('Prefix dev ter no mínimo 3 caractéres')
        
    if(validity <= 0) throw new ValidationError('Validade deve ser número inteiro maior que zero')
        
        
    function gerarSKU(){
        const aleatorio = Math.random().toString(36).substring(2,5).toUpperCase()
        

        const sufixo = Date.now().toString().substring(10)
         
        return `${prefix}-${sufixo}${aleatorio}`
    }

    const sku = gerarSKU()
    
    
    const result = await insertProducts({name, prefix, sku, validity})
    return result

}



export const getProducts = async({name, prefix, sku}) =>{
    let query = `SELECT * FROM products WHERE 1=1 `
    const params = []

    if(name){
        query += `AND name LIKE ?`
        params.push(`%${name}%`)
    }

    if(prefix){
        query += `AND prefix LIKE ?`
        params.push(`%${prefix}%`)
    }

    if(sku){
        query += `AND sku LIKE ?`
        params.push(`%${sku}%`)
    }

    const result = await get({query, params})
    return result
}


export const getProductId = async ({id}) =>{
    if(id <= 0) throw new ValidationError('Id deve ser um número inteiro maior que zero')
        
    const result = await getById(id)
    return result
}





export const insertProductStock = async ({sku, batch, quantity}) => {
    if(quantity <= 0) throw new ValidationError('Quantidade deve ser maior que zero')
    
    const connection = await pool.getConnection()

    try{
        await connection.beginTransaction()

        const [pegarStatus] = await getBySKU({sku, batch})
        console.log(pegarStatus.id)
        if(pegarStatus.status === 'completed') throw new ValidationError('Ordem de produção já concluida')

        await updateStatus(pegarStatus.id, connection) 

        const [result] = await insertStock({sku, batch, quantity, connection})
        console.log(result)
        await connection.commit()


    }catch (err){
        await connection.rollback()
        console.error('Erro ou Concluir ordem de produção')
        throw err
    }finally{
        connection.release()
    }
    
}




export const getStock = async()=>{
    let queries = `WHERE 1=1`
    const params = []


    const result = await stock(queries, params)
    return result
}