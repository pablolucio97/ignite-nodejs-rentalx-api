import { Car } from "@modules/cars/infra/typeorm/entities/Cars"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { injectable, inject } from "tsyringe";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListAvailableCarsUseCase {

    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) { }

    async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailables(
            category_id,
            brand,
            name
        )
        return cars
    }
}

export { ListAvailableCarsUseCase }