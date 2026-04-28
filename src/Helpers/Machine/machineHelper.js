import { pool } from '../../../database/database.js'

export const insertMachines = async()=>{
    try{
        const [result] = await pool.query(`
        INSERT INTO machines (id) VALUES (NULL)`)

        console.log('1. Helper (ID do Banco):', result.insertId)
            return result.insertId
    }catch (err){
        console.error('Erro ao inserir maquina:', err)
        throw err
    }        
}


export const get = async () =>{
    try{
        const [result] = await pool.query(`
        SELECT * FROM machines`, [])

        return result
    }catch (err){
        console.error('Erro ao buscar máquinas')
        throw err
    }    
}