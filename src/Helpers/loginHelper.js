import { pool } from '../../database/database.js'

export const get = async (user) =>{

    

    try{
        const [result] = await pool.query(`
        SELECT * FROM users WHERE user = ?`, [user])
        
        return result
    }catch (err){
        console.error('Erro ao buscar user para login')
        throw err
    }    
}