import { ValidationError} from '../Errors/ValidationError.js'

import { insertUser } from '../Services/userService.js'






export const createUser = async (req, res) =>{
    const {password, role} = req.body
    console.log(password, role)

    if(password.length < 8 ) throw new ValidationError('A senha deve ter exatamente 8 caractéres')
    if(!role) throw new ValidationError()

   const result = await insertUser({password, role})
   return res.status(201).json({data: result})
}