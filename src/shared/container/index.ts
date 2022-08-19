import { container } from 'tsyringe'

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoryRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUserRepository'
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository'

container.registerSingleton<ICategoriesRepository>('CategoriesRepository',
    CategoriesRepository)

container.registerSingleton<ISpecificationRepository>('SpecificationsRepository',
    SpecificationRepository)

container.registerSingleton<IUsersRepository>('UsersRepository',
    UserRepository)