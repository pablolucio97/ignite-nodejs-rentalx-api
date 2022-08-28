import {
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { User } from "./user";
import { v4 as uuidv4 } from 'uuid'

@Entity("users_token")
class UserTokens {

    @PrimaryColumn()
    id: string;

    @Column()
    refresh_token: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    expires_date: Date;

    @CreateDateColumn()
    created_at: Date;

    //THE FOREIGN KEY TYPE - many tokens for a single user
    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

}

export { UserTokens }