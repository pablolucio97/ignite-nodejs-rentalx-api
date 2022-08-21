import { AppError } from '@shared/errors/AppError';
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory-tests/CarsRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory-tests/SpecificationsRepositoryInMemory';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMememory: CarsRepositoryInMemory
let specificationsRepositoryInMememory: SpecificationsRepositoryInMemory

describe('CreateCarSpecification', () => {

    beforeEach(() => {
        carsRepositoryInMememory = new CarsRepositoryInMemory()
        specificationsRepositoryInMememory = new SpecificationsRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMememory, specificationsRepositoryInMememory)
    })

    it('should not be able to add a new specification to a now-existent car', async () => {
        expect(async () => {
            const car_id = 'sduifh823'
            const specifications_id = ['some specification']
            await createCarSpecificationUseCase.execute({ car_id: car_id, specifications_id })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to add a new specification to the car', async () => {
        const car = await carsRepositoryInMememory.create({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        })

        const specification = await specificationsRepositoryInMememory.create({
            description: 'test',
            name: 'test'
        })

        const specifications_id = [specification.id]
        const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id })

        expect(specificationsCars).toHaveProperty('specifications')
        expect(specificationsCars.specifications.length).toBe(1)

    })
})