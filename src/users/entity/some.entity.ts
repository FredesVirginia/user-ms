import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()

export class Somting {
@PrimaryGeneratedColumn('uuid')
    id : string;

@ManyToMany(()=>User , (user) => user.reviews)
 user : User



 @Column()
 productId : string;

 @Column('int')
 rating : number;

 @Column('text' , {nullable : true})
 comment : string


   
   @CreateDateColumn()
   createdAt: Date;
 
   @UpdateDateColumn()
   updatedAt: Date;
}