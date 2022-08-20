import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory-tests/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listCarsUseCase: ListAvailableCarsUseCase
let carsRepository: CarsRepositoryInMemory

describe('list cars', () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory()
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepository)
    })

    it('should be able to list all available cars', async () => {

        const createdCar = await carsRepository.create({
            "name": "Audi A4",
            "description": "Sport sedan car",
            "daily_rate": 140,
            "license_plate": "DEF-1234",
            "fine_amount": 100,
            "brand": "Audi",
            "category_id": "6e92a92f-56a3-4e4e-a989-750a0749dac1"
        })

        const cars = await listCarsUseCase.execute({})

        expect(cars).toEqual([createdCar])
    })
})