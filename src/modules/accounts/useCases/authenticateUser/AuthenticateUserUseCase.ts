import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUserRepositoryTokens";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
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
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject(`UsersTokensRepository`)
        private usersTokensRepository: IUsersTokensRepository,
        @inject(`DateProvider`)
        private DateProvider: IDateProvider
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

        const {
            secret_token,
            expires_in_refresh_token,
            expires_in_token,
            expires_refresh_token_days,
            secret_refresh_token

        } = auth

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        })

        const refresh_token = sign({}, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        const refresh_token_expires_date = this.DateProvider
            .addDays(expires_refresh_token_days)

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token: secret_refresh_token,
            expires_date: refresh_token_expires_date,
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase };

