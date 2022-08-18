import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/implementations/IUserRepository";
import { ICreateUserDto } from "@modules/accounts/dtos/ICreateUserDto";

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