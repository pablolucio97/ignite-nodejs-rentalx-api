import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];

    async create({
        brand,
        category_id,
        name,
        description,
        fine_amount,
        daily_rate,
        license_plate
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car()
        Object.assign(car, {
            brand,
            category_id,
            name,
            description,
            fine_amount,
            daily_rate,
            license_plate
        })

        await this.cars.push(car)
        return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.cars.find(car => car.license_plate === license_plate)
        return car
    }

    async findAvailables(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const cars = await this.cars
            .filter(car => {
                if (car.available === true || (brand && car.brand === brand) || (category_id && category_id) || (name && car.name === name)) {
                    return cars
                }
            }
            )
        return cars
    }
}

export { CarsRepositoryInMemory }