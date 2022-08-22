import { Router } from 'express'
import Multer from 'multer'
import UploadConfig from '@config/upload'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsConstroller'
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController'

const carsRouter = Router()

const createCarControllerontroller = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImagesController()

const upload = Multer(UploadConfig.upload('./tmp/cars'))


carsRouter.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarControllerontroller.handle
)
carsRouter.get(
    '/available',
    listAvailableCarsController.handle
)
carsRouter.post(
    '/specifications/:id',
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
)
carsRouter.post(
    '/images/:id',
    ensureAuthenticated,
    ensureAdmin,
    upload.array('images'),
    uploadCarImageController.handle
)

export { carsRouter }