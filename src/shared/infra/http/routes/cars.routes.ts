import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import {Router} from 'express'
import {ensureAuthenticated} from '../middlewares/ensureAuthenticate'
import {ensureAdmin} from '../middlewares/ensureAdmin'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsConstroller'

const carsRouter = Router()

const createCarControllerontroller = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()


carsRouter.post('/', ensureAuthenticated, ensureAdmin, createCarControllerontroller.handle)
carsRouter.get('/available',  listAvailableCarsController.handle)

export {carsRouter}