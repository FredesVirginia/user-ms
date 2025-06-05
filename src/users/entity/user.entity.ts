import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Review } from './review.entity';
import { UserRole } from '../enums/enums';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true ,
    default:"1233333333ytyt"
  })
  password : string;

  @Column({
    type:'enum',
    enum: UserRole, 
    default : UserRole.USER
  })
  role:UserRole

  @OneToMany(()=>Review , (review)=> review.user , { cascade : true})
   reviews : Review[]

  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
