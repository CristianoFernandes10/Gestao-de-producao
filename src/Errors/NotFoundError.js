import { AppError } from "./AppError.js";

export class NotFoundError extends AppError{
    constructor(message = 'Não encontrado'){
        super(message, 404)
    }
}