import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {

    private repository: Repository<Rental>

    constructor() {
        this.repository = getRepository(Rental)
    }
    findByCarId(car_id: string): Promise<Rental> {
        throw new Error("Method not implemented.");
    }
    findOpenRentalByUser(user_id: string): Promise<Rental> {
        throw new Error("Method not implemented.");
    }
    create({ car_id, user_id, expect_return_date }: ICreateRentalDTO): Promise<Rental> {
        throw new Error("Method not implemented.");
    }

    async findById(user_id: string) : Promise<Rental[]>{
        const rentals = await this.repository.find({
            where: {user_id},
            relations: ["car_id"]
        })

        return rentals
    }

}

export { RentalsRepository }