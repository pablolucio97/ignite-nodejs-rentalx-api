import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SenForgottenPasswordMailUseCase } from './SenForgottenPasswordMailUseCase'

class SendForgottenPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { email } = request.body

        const sendForgottenPasswordMailUseCase = await container
            .resolve(SenForgottenPasswordMailUseCase)

        await sendForgottenPasswordMailUseCase.execute(email)

        return response.send()
    }

}

export { SendForgottenPasswordMailController }
