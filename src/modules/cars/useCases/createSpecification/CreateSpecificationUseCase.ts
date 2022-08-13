import { AppError } from './../../../../errors/AppError';
import { inject, injectable } from 'tsyringe'
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository"

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationRepository) {
    }

    async execute({ name, description }: IRequest): Promise<void> {

        const specificationAlreadyExists = await this.specificationsRepository.findByName(name)

        if (specificationAlreadyExists) {
            throw new AppError(`Specification ${name} already exists`, 401)
        }

        await this.specificationsRepository.create({ name, description })
    }
}

export { CreateSpecificationUseCase }