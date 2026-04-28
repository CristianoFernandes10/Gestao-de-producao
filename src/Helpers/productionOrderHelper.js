import { pool } from '../../database/database.js'

export const insertOrder = async (data) =>{
    const {sku, machine_id, batch, quantity} = data


    try{
        const [result] = await pool.query(`
        INSERT INTO production_order (sku, machine_id, batch, quantity) VALUES (?,?,?,?)`, [sku, machine_id, batch, quantity])

        return {
            id: result.insertId,
            sku,
            machine_id,
            batch,
            quantity
        }

    }catch (err){
        console.error('Erro ao inserir na tabela production_order')
        throw err
    }
}



export const get = async (queries, params) =>{


    const sql_base = `
    SELECT
        production_order.id,
        production_order.batch,
        production_order.quantity,
        production_order.status,
        products.sku,
        products.name AS product_name,
        machines.id AS machine_id,
        production_order.created_at
        FROM production_order
        JOIN products ON production_order.sku = products.sku
        JOIN machines ON production_order.machine_id = machines.id`

    const sql_final = `${sql_base} ${queries}`

    
    try{
        const [result] = await pool.query(sql_final, params)
        

        return result
    }catch (err){
        console.error('Erro ao buscar ordens de produção')
        throw err
    }   

}

export const getBySKU = async (data) =>{
    const {sku, batch} = data
    try{
        const [result] = await pool.query(`
        SELECT * FROM production_order WHERE sku = (?) AND batch = (?)`,[sku, batch])

        return result
            
        
    }catch (err){
        console.error('Erro ao buscar status da tabela product_order')
        throw err
    }
}

export const updateStatus = async (id, connection) => {

    
    try{
       const [info] =  await connection.query(`
        UPDATE production_order SET status = 'completed' WHERE id = ?`, [id])
        
        

        if(info.affectedRows === 0){
            console.log('Nenhuma ordem encontrada com esse id')
            return false
        }   

        console.log('Ordem de produção atualizada com sucesso')
        return true
    }catch (err){
        console.error('Erro ao atualizar status da tabela production_order')
        throw err
    }
}