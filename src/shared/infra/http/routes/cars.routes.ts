import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsConstroller'

const carsRouter = Router()

const createCarControllerontroller = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()


carsRouter.post('/', ensureAuthenticated, ensureAdmin, createCarControllerontroller.handle)
carsRouter.get('/available', listAvailableCarsController.handle)
carsRouter.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

export { carsRouter }