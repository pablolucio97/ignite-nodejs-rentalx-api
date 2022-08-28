import { ICreateUserTokenDto } from "@modules/accounts/dtos/ICreateUserTokenDto";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUserRepositoryTokens";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

class UsersTokenRepository implements IUsersTokensRepository {

    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        throw new Error("Method not implemented.");
    }

    async create({
        expires_date,
        refresh_token,
        user_id
    }: ICreateUserTokenDto): Promise<UserTokens> {

        const userToken = await this.repository.create({
            user_id,
            expires_date,
            refresh_token
        })

        await this.repository.save(userToken)

        return userToken
    }

    async findByUserId(user_id: string, refresh_token: string): Promise<UserTokens> {
        const usersTokens = await this.repository.findOne({
            user_id,
            refresh_token
        })
        return usersTokens
    }

    async deleteById(user_id: string): Promise<void> {
        await this.repository.delete(user_id)
    }

}

export { UsersTokenRepository }