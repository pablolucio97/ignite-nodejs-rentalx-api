import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { inject } from "tsyringe";

interface IRequest {
    user_id: string
    avatar_file: string;
}

class UpdateUserAvatarUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }
    async execute({ user_id, avatar_file }: IRequest): Promise<void> {

        const user = await this.usersRepository.findById(user_id)

        await this.storageProvider.save(avatar_file, 'avatar')

        if(user.avatar){
            await this.storageProvider.delete(user.avatar, 'avatar')
        }

        user.avatar = avatar_file

        await this.usersRepository.create(user)

    }
}

export { UpdateUserAvatarUseCase };
