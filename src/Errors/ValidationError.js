import { AppError } from "./AppError.js";

export class ValidationError extends AppError{
    constructor(message = 'Credenciais inválidas'){
        super(message, 400)
    }
}