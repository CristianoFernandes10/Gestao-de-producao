import { pool } from './database.js'


export const initializeDB = async () =>{
    try{

        //  await pool.query('DROP TABLE IF EXISTS users')
        // console.log('Tabela products apagada com sucesso')

        

        await pool.query(`
        CREATE TABLE IF NOT EXISTS products(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(60) NOT NULL,
        prefix VARCHAR(5) NOT NULL,
        sku VARCHAR(20) UNIQUE,
        validity INT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`)

        


        await pool.query(`
        CREATE TABLE IF NOT EXISTS machines(
        id INT PRIMARY KEY AUTO_INCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`)

       

        await pool.query(`
        CREATE TABLE IF NOT EXISTS production_order(
        id INT PRIMARY KEY AUTO_INCREMENT,
        sku VARCHAR(20) NOT NULL,
        machine_id INT NOT NULL,
        quantity INT NOT NULL, 
        batch VARCHAR(60) DEFAULT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT check_status CHECK (status IN('pending', 'in_progress', 'completed', 'canceled')),
        FOREIGN KEY (sku) REFERENCES products (sku),
        FOREIGN KEY (machine_id) REFERENCES machines (id))`)

        



        await pool.query(`
        CREATE TABLE IF NOT EXISTS products_stock(
        id INT PRIMARY KEY AUTO_INCREMENT,
        sku VARCHAR(20) NOT NULL,
        batch VARCHAR(60) NOT NULL UNIQUE,
        quantity INT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sku) REFERENCES products (sku)
        )`)

        


        await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id INT PRIMARY KEY AUTO_INCREMENT,
        role ENUM('LAB', 'PRD', 'EXP', 'STO', 'SUPER') NOT NULL,
        user VARCHAR(20) DEFAULT NULL,
        password VARCHAR(60) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`)

        
        
        
        
    }catch (err){
        console.error('Erro ao criar tabelas:', err.stack)
        process.exit(1)
    }
}