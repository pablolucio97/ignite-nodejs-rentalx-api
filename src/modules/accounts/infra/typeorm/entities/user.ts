import { v4 as uuidv4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { Expose } from 'class-transformer'


@Entity('users')
class User {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    driver_license: string;

    @Column()
    isAdmin: boolean;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @Expose({ name: 'avatar_url' })
    avatar_url(): string {
        switch (process.env.disk) {
            case 's3':
                return `${process.env.AWS_BUCKET_BASEURL}/avatar/${this.avatar}`
            case 'local':
                return `${process.env.LOCALHOST_BASEURL}/avatar/${this.avatar}`
            default:
                return null
        }
    }

    constructor() {
        if (!this.id) {
            this.id = uuidv4()
        }
    }
}

export { User }