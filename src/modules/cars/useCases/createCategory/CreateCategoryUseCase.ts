import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface RequestDataProps{
    name: string
    description: string
}

class CreateCategoryUseCase {

    constructor(private categoriesRepository : ICategoriesRepository)    {}

    execute({name, description} : RequestDataProps) : void {
      
        const categoryAlreadyExists = this.categoriesRepository.findByName(name)

        if (categoryAlreadyExists) {
            throw new Error('Category already exists.')
        }

        this.categoriesRepository.create({ name, description })
    }
}

export { CreateCategoryUseCase };
