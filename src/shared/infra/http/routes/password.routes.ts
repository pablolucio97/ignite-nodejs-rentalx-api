import { ResetPasswordController } from '@modules/accounts/useCases/resetPassword/ResetPasswordController'
import { SendForgottenPasswordMailController } from '@modules/accounts/useCases/sendForgottenEmail/SendForgottenPasswordMailController'
import { Router } from 'express'

const passwordRoutes = Router()
const sendForgottenPasswordMailUseCase = new SendForgottenPasswordMailController()
const resetPasswordController = new ResetPasswordController()
passwordRoutes.post('/forgot', sendForgottenPasswordMailUseCase.handle)
passwordRoutes.post('/reset', resetPasswordController.handle)

export { passwordRoutes }

