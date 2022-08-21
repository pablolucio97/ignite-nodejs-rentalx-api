import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Cars";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>
    constructor() {
        this.repository = getRepository(Car)
    }

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        specifications,
        id
    }: ICreateCarDTO): Promise<Car> {

        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications,
            id
        })

        await this.repository.save(car)

        return car

    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate })
        return car
    }


    async findAvailables(
        brand?: string,
        category_id?: string,
        name?: string
    ) : Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("car")
            .where("available = :available", { available: true }) //field name and value

        if (brand) {
            carsQuery.andWhere("car.brand = :brand", { brand })
        }
        if (name) {
            carsQuery.andWhere("car.name = :name", { name })
        }
        if (category_id) {
            carsQuery.andWhere("car.category_id = :category_id", { category_id })
        }

        const cars = await carsQuery.getMany(); //get an array of returned cars
        return cars

    }

    async findById(id) : Promise<Car>{
        const car = await this.repository.findOne(id)
        return car
    }

}

export { CarsRepository }