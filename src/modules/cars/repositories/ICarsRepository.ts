import { ICreateCarDTO } from "../dtos/ICreateCarDTO"
import { Car } from "../infra/typeorm/entities/Cars";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>
    findAvailables(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]>
    findById(id: string): Promise<Car>;
}

export { ICarsRepository }