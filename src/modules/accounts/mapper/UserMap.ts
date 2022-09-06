import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/user";
import { classToClass } from 'class-transformer'

class UserMap {
    // static allows to use the method without instance the class
    static toDTO({
        id,
        email,
        name,
        avatar,
        driver_license,
        avatar_url,
    }: User): IUserResponseDTO {
        // does the class manipulation return also the value of avatar_url function
        const user = classToClass({
            id,
            email,
            name,
            avatar,
            driver_license,
            avatar_url
        })
        return user
    }
}

export { UserMap }