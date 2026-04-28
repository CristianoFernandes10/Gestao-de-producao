import { AppError } from "./AppError.js";

export class AuthError extends AppError{
    constructor(message = 'Não autendicado'){
        super(message, 401)
    }
}