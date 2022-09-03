import { Response, Request } from "express"
import { container } from "tsyringe"
import { ResetPasswordUsecase } from "./ResetPasswordUseCase"

class ResetPasswordController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { token } = req.query
        const { password } = req.body
        const resetPasswordUsecase = container.resolve(ResetPasswordUsecase)
        await resetPasswordUsecase.execute({ token: String(token), password })
        return res.send()
    }

}

export { ResetPasswordController }