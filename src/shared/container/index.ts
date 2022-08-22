import { container } from 'tsyringe'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoryRepository'
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUserRepository'
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository'

//each container is called when a class with inject with class name is instantiated

container.registerSingleton<ICategoriesRepository>('CategoriesRepository',
    CategoriesRepository)

container.registerSingleton<ISpecificationsRepository>('SpecificationsRepository',
    SpecificationRepository)

container.registerSingleton<IUsersRepository>('UsersRepository',
    UsersRepository)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)
container.registerSingleton<ICarsImagesRepository>('CarsImagesRepository', CarsImagesRepository)
