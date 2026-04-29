import { AuthError } from "../Errors/AuthError.js"
import jwt from 'jsonwebtoken'


export const auth = (req, res, next) =>{
    const header = req.headers.authorization
    if(!header) throw new AuthError('Token não fornecido')

    const token = header.split(' ')[1]
    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        return next()
    }catch (err){
        throw new AuthError('Token inválido ou expirado')
    }

}

