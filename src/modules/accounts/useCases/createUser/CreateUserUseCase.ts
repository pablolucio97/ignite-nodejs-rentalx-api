import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt';

import { ICreateUserDto } from './../../dtos/ICreateUserDto';
import { IUsersRepository } from "../../repositories/implementations/IUserRepository";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({
        name,
        password,
        email,
        driver_license
    }: ICreateUserDto): Promise<void> {

        const userAlreadyExists = await this.usersRepository
            .findByEmail(email)

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license
        })
    }
}

export { CreateUserUseCase }