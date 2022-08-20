import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import {Router} from 'express'
import {ensureAuthenticated} from '../middlewares/ensureAuthenticate'
import {ensureAdmin} from '../middlewares/ensureAdmin'

const carsRouter = Router()

const createCarControllerontroller = new CreateCarController()


carsRouter.post('/', ensureAuthenticated, ensureAdmin, createCarControllerontroller.handle)

export {carsRouter}