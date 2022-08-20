import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from "tsyringe";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError('Email or password incorrect')
        }

        if (!user) {
            throw new AppError('User does not exists')
        }

        const token = sign({}, '6ebbc2816367bcf0f8c10a5f5542b960', {
            subject: user.name,
            expiresIn: '1d'
        })

        return { user, token }
    }
}

export { AuthenticateUserUseCase };
