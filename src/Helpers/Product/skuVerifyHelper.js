import { pool } from '../../../database/database.js'

export const verifica = async (sku) =>{
    try{
        const [result] = await pool.query(`
        SELECT * FROM products WHERE sku = ?`, [sku])

        return result
    }catch (err){
        console.error('Produto não encontrado', err.stack)
        throw err
    }
}