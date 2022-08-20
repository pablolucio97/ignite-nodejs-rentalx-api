import {
    Column,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    PrimaryColumn
 } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'
import { Category } from './Category';

class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @ManyToOne(() => Category) // many cars to one category (think like "L")
    @JoinColumn({name: 'category_id'}) // name of the field PK, is being created now
    category: Category //doesn't exists in the cars table, is being created now like a bridge

    @Column()
    category_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4()
            this.available = true
        }
    }

}

export { Car }