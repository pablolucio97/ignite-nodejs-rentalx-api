import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserUseCase } from '../authenticateUser/AuthenticateUserUseCase'


class AuthenticateUserController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { password, email } = req.body
        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
        const token = await authenticateUserUseCase.execute({ password, email })
        return res.json(token)
    }

}

export { AuthenticateUserController }