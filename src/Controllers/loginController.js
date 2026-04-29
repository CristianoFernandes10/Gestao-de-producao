import { ValidationError } from "../Errors/ValidationError.js";
import { login } from '../Services/loginService.js'

export const loginController = async (req, res) =>{
    const {user, password} = req.body
    


    if(!user || !password) throw new ValidationError()

    const result = await login({user, password})
    return res.status(200).json({token: result})
}