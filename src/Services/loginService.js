import { ValidationError } from "../Errors/ValidationError.js";
import { AuthError } from '../Errors/AuthError.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { get } from '../Helpers/loginHelper.js'



export const login = async ({user, password}) =>{
    if(user.trim() === "" || password.trim() === "") throw new ValidationError('Os campos não podem conter espaços')

    try{
        const [result] = await get(user)
        if(!result) throw new AuthError('User ou senha inválidos')

       


    
        const match = await bcrypt.compare(password, result.password)
        if(!match) throw new AuthError('User ou senha inválidos')
        

        const token = jwt.sign({id: result.id, role:result.role}, process.env.JWT_SECRET, {expiresIn: '20h'})
        console.log(token)

        return token

    }catch (err){
        console.error('Erro ou fazer login')
        throw err
    }
}