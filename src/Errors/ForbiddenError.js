import { AppError } from "./AppError.js";

export class ForbiddenError extends AppError{
    constructor(message = 'Usuário sem permissão'){
        super(message, 403)
    }
}