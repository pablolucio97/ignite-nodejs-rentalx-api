import { Router } from 'express'
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticate'

const rentalsRouter = Router()

const createRentalController = new CreateRentalController()

rentalsRouter.post('/', ensureAuthenticated, createRentalController.handle)

export { rentalsRouter }

