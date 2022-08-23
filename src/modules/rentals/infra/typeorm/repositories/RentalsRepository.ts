import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {

    private repository: Repository<Rental>

    constructor() {
        this.repository = getRepository(Rental)
    }

    async findByCarId(car_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ car_id })
        return rental
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ user_id })
        return rental
    }

    async create({ car_id, user_id, expect_return_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = await this.create({ car_id, user_id, expect_return_date })
        await this.repository.save(rental)

        return rental
    }

}

export { RentalsRepository }