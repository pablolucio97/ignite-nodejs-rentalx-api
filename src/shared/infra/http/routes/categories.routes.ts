import { Router } from 'express'
import multer from 'multer'
import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/createCategoryController'
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const categoriesRoutes = Router()
const upload = multer({
    dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
) //need be in the correct execution order

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post('/import', upload.single("file"),
    importCategoryController.handle)

export { categoriesRoutes }