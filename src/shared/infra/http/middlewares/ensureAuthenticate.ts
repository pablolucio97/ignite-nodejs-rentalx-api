import auth from '@config/auth';
import { UsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensReposiroty';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';


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

        const { sub: user_id } = verify(token, auth.secret_token) as IPayload

        req.user = {
            id: user_id
        }

        next()
        
    } catch (error) {
        throw new AppError('Invalid token', 401)
    }
}