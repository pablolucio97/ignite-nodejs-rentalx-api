import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppError';
import { UserRepository } from '../modules/accounts/repositories/UserRepository';

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new AppError('Missing token', 401)
    }

    const [, token] = authHeader.split(' ')

    try {

        const { sub: user_id } = verify(token, '6ebbc2816367bcf0f8c10a5f5542b960') as IPayload

        const usersRepository = new UserRepository();
        const user = await usersRepository.findById(user_id)

        if(!user){
            throw new AppError('User does not exists', 401)
        }

        req.user = {
            id: user_id
        }

        next()

    } catch (error) {
        throw new AppError('Invalid token', 401)
    }


}