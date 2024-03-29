import {inject, injectable} from 'tsyringe'
import { AppError } from "@shared/errors/AppError"
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

interface RequestDataProps{
    name: string
    description: string
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository : ICategoriesRepository)    {}

   async  execute({name, description} : RequestDataProps) : Promise<void> {
      
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

        if (categoryAlreadyExists) {
            throw new AppError('Category already exists.', 400)
        }

        this.categoriesRepository.create({ name, description })
    }
}

export { CreateCategoryUseCase };
