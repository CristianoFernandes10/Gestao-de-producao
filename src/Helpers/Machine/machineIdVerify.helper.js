import { pool } from '../../../database/database.js'

export const verificaId = async (machine_id)=>{
    try{
        const [result] = await pool.query(`
        
        SELECT * FROM machines WHERE id = ?`, [machine_id])
        return result
    }catch (err){
        console.error('Máquina não encontrada', err.stack)
        throw err
    }
}