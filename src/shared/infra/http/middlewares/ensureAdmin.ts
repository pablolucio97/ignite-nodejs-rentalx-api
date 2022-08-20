import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'
import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'

export async function ensureAdmin(
    req: Request, res: Response, next: NextFunction
){
    const {id} = req.user // from extended express typing
    const usersRepository = new UsersRepository() 
    const user = await usersRepository.findById(id)

    if(!user.isAdmin){
        throw new AppError('Uses is not an admin')
    }

    return next()

}