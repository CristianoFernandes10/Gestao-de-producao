import { pool } from "../../../database/database.js";

export const insertProducts = async(data)=>{
    const {name, prefix, sku, validity} = data

    try{

        const [result] = await pool.query(`
            INSERT INTO products (name, prefix, sku, validity) VALUES(?,?,?,?)`, [name, prefix, sku, validity])

            return {
                id: result.insertId,
                name,
                prefix,
                sku,
                validity
            }
    }catch (err){
        if(err.code === 'ER_DUP_ENTRY'){
            throw new Error('Erro de Duplicidade: Este SKU já está em uso.')
        }

        console.error(err)
        throw new Error('Falha interna ao salvar produto')
    }    
        
    
}





export const get = async (data) =>{
    const {query, params} = data
    try{
        const [result] = await pool.query(query, params)

        return result
    }catch (err){
        console.error('Erro ao pegar produtos', err.stack)
        throw err
    }
}


export const getById = async (id) =>{
    
    
    try{
        const [result] = await pool.query(`
        SELECT * FROM products WHERE id = ?`, [id])

        return result
    }catch (err){
        console.error('Erro ao buscar produto pela ID')
        throw err
    }
}




export const insertStock = async (data) =>{
    const {sku, batch, quantity, connection} = data


    try{
        const [result] = await connection.query(`
        INSERT INTO products_stock (sku, batch, quantity) VALUES(?,?,?)`, [sku, batch, quantity])

        console.log(result)


        return {
            id: result.insertId,
            sku,
            batch,
            quantity
        }
    }catch (err){
        console.error('Erro ao inserir na tabela product_stock')
        throw err
    }


}




export const stock = async (queries, params) =>{

    const sql_base = `
    SELECT
    products_stock.id,
    products.name,
    products_stock.sku,
    products_stock.batch,
    products.validity,
    products_stock.quantity
    FROM products_stock
    JOIN products ON products_stock.sku = products.sku
    `

    const sql_final = `${sql_base} ${queries}`

    try{    
        const [result] = await pool.query(sql_final, params)
        return result
    }catch (err){
        console.error('Erro ou buscar tabela products_stock')
        throw err
    }
}