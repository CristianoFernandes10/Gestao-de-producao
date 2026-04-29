import { ForbiddenError } from '../Errors/ForbiddenError.js'

export const authRole = (allowedRoles) => (req, res, next) =>{
    if(!req.user || !req.user.role) throw new ForbiddenError('Perfil não identificado')

    
    if(!allowedRoles.includes(req.user.role)) throw new ForbiddenError()

    next()
}