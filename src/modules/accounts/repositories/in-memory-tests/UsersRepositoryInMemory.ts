import { ICreateUserDto } from '../../dtos/ICreateUserDto';
import { User } from '../../infra/typeorm/entities/user';
import { IUsersRepository } from '../implementations/IUserRepository';


class UsersRepositoryInMemory implements IUsersRepository {

    users: User[] = []

    async create({ driver_license, email, name, password }: ICreateUserDto): Promise<void> {
        const user = new User()
        Object.assign(user, { driver_license, email, name, password })
        this.users.push(user)
    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email)
    }
    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id)
    }

}

export { UsersRepositoryInMemory }