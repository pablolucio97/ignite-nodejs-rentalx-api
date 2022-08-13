import { getRepository, Repository } from 'typeorm'
import { ICreateUserDto } from '../dtos/ICreateUserDto'
import { User } from '../entities/user'
import { IUsersRepository } from './implementations/IUserRepository'

class UserRepository implements IUsersRepository {

    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }

    async create({
        id,
        avatar,
        name,
        email,
        password,
        driver_license
    }: ICreateUserDto): Promise<void> {
        const user = {
            id,
            avatar,
            name,
            email,
            driver_license,
            password,
        }

        await this.repository.save(user)
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email })
        return user
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ id })
        return user
    }

}

export { UserRepository }