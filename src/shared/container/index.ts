import { container } from 'tsyringe'

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoryRepository'
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository'
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository'
import { UserRepository } from '../../modules/accounts/repositories/UserRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/implementations/IUserRepository'

container.registerSingleton<ICategoriesRepository>('CategoriesRepository',
    CategoriesRepository)

container.registerSingleton<ISpecificationRepository>('SpecificationsRepository',
    SpecificationRepository)

container.registerSingleton<IUsersRepository>('UsersRepository',
    UserRepository)