import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";

class CarsImagesRepository {
    private repository: Repository<CarImage>;
    constructor() {
        this.repository = getRepository(CarImage)
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = await this.repository.create({
            car_id,
            image_name
        })

        await this.repository.save(carImage)

        return carImage
    }
}

export { CarsImagesRepository }