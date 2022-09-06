import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory-tests/RentalsRepositoryInMemory";
import { DateProvider } from "@shared/container/providers/DateProvider/implementations/DayJSDateProvider";

import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';
import { CreateRentalUseCase } from "./CreateRentalUseCase";

describe('Rentals', () => {

    const dayAdd24Hours = dayjs().add(1, 'day').toDate()
    let createRentalUseCase: CreateRentalUseCase
    let rentalsRepositoryInMemory: RentalsRepositoryInMemory
    let dayJSProvider : DateProvider

    beforeEach(() => {

        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        dayJSProvider = new DateProvider()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJSProvider)
    })

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: '12345',
            expected_return_date: dayAdd24Hours,
        })

        console.log(rental)

        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })

    it('should not be able to create a new rental for an existing rental for same user'
        , async () => {
            expect(async () => {
                await createRentalUseCase.execute({
                    user_id: '12345',
                    car_id: '12345',
                    expected_return_date: dayAdd24Hours,
                })

                await createRentalUseCase.execute({
                    user_id: '12345',
                    car_id: '12345',
                    expected_return_date: dayAdd24Hours,
                })
            }).rejects.toBeInstanceOf(AppError)
        })
    it('should not be able to create a new rental with invalid return time'
        , async () => {
    
                await createRentalUseCase.execute({
                    user_id: '12345',
                    car_id: '12345',
                    expected_return_date: dayjs().toDate(),
                })
            
        })
})