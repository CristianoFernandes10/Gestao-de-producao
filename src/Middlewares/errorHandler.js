import { AppError } from "../Errors/AppError.js";

export const errorHandler = (err, req, res, next)=>{



    if(err instanceof AppError){
        console.error('DEBUG:', err.stack)
        return res.status(err.statusCode).json({error: err.message})
    }

    console.error('DEBUG:', err.stack)
        return res.status(500).json({error: 'Erro interno no servidor'})

}