import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
  } from "typeorm";
  import { v4 as uuidV4 } from "uuid";
  
  import { Category } from "./Category";
  import { Specification } from "./Specification";
  
  @Entity("cars")
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
    
    @ManyToMany(() => Specification) // from this to Specification table
    @JoinTable({
        name: 'specifications_cars', // name of the relationship table
        joinColumns: [{name: 'car_id'}] , // column of relationship table to refer this table
        inverseJoinColumns: [{name: 'specification_id'}] // column of relationship table to refer the another table
    })
    specifications: Specification[];
  
    @CreateDateColumn()
    created_at: Date;
  
    constructor() {
      if (!this.id) {
        this.id = uuidV4();
        this.available = true;
      }
    }
  }
  
  export { Car };




