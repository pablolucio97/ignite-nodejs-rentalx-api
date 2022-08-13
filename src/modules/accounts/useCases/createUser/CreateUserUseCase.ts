import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';
import { ICreateUserDto } from './../../dtos/ICreateUserDto';
import { IUsersRepository } from "../../repositories/implementations/IUserRepository";
import { AppError } from "../../../../errors/AppError";

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

        if (userAlreadyExists) {
            throw new AppError('User already exists', 401);
        }

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