import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {

    specificaions: Specification[] = [];

    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification()

        Object.assign(specification, {
            description,
            name
        })

       await this.specificaions.push(specification)
       return specification
    }
    
    async findByName(name: string): Promise<Specification> {
        return this.specificaions.find(spec => spec.name === name);
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.specificaions.filter(spec => ids.includes(spec.id))
    }

}

export { SpecificationsRepositoryInMemory }