import { CategoriesRepository } from "../../repositories/implementations/CategoryRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoryUseCase } from "./ListCategoriesUseCase";

export default () => {
    const categoriesRepository = new CategoriesRepository()
    const listCategoriesUseCase = new ListCategoryUseCase(categoriesRepository)
    const listCategoriesController = new ListCategoriesController(listCategoriesUseCase)
    return listCategoriesController
}

