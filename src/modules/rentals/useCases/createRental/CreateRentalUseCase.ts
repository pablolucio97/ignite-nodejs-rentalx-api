import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    car_id: string;
    expect_return_date: Date;
}

const minHour = 24

@injectable()
class CreateRentalUseCase {
    constructor(
            @inject('RentalsRepository')
            private rentalsRepository: IRentalsRepository,
            private dateProvider: IDateProvider
        ) { }

    async execute({
        car_id,
        user_id,
        expect_return_date
    }: IRequest): Promise<Rental> {

        const carUnvailable = await this.rentalsRepository.findByCarId(car_id)

        if (carUnvailable) {
            throw new AppError('Car is unavailable')
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if (rentalOpenToUser) {
            throw new AppError('There is a rental opened for this user')
        }

        const dateNow = this.dateProvider.dateNow()
        const compare = this.dateProvider.compareInHours(dateNow, expect_return_date)

        if (compare < minHour) {
            throw new AppError('Invalid return time')
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expect_return_date
        })

        return rental
    }
}

export { CreateRentalUseCase }