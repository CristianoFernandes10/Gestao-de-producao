import { ValidationError } from "../Errors/ValidationError.js"
import bcrypt from 'bcrypt'
import { insert, update} from "../Helpers/userHelper.js"
import { pool } from '../../database/database.js'
import { NotFoundError} from '../Errors/NotFoundError.js'


export const insertUser = async ({password, role}) =>{

    if(password.trim() === '') throw new ValidationError('Os campos não podem conter espaços')
    
    
    const connection = await pool.getConnection()
    
    try{    
        const cryptPass = await bcrypt.hash(password, 10)

        
        await connection.beginTransaction()
        
        const result = await insert({password: cryptPass, role, connection})

        const id = result.id
        const userRole = result.role

        const user = `${userRole}${id.toString().padStart(2, '0')}`

        

        const updateUser = await update({id, user, connection})
        if(!updateUser) throw new NotFoundError('User não encontrado')


        await connection.commit()    

        const finallyResult = {
            id: result.id,
            user: user,
            role: result.role
        }
    
        return finallyResult

        
    }catch (err){
        await connection.rollback()
        console.error('Erro ao concluir criação de usuário')
        throw err
    }finally{
        connection.release()
    }

    



}