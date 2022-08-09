import { Request, Response } from 'express'
import { ListCategoryUseCase } from '../listCategories/ListCategoriesUseCase'
import { container } from 'tsyringe'

class ListCategoriesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listCategoryUseCase = container.resolve(ListCategoryUseCase)
        const all = await listCategoryUseCase.execute()
        return res.json(all).send()
    }
}

export { ListCategoriesController }