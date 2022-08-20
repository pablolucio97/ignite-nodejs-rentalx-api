import { ICreateUserDto } from "@modules/accounts/dtos/ICreateUserDto";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from 'bcryptjs';
import { inject, injectable } from "tsyringe";

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

export { CreateUserUseCase };
