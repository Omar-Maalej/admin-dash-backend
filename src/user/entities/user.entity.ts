import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "./user-roles.enum";
import { Order } from "src/order/entities/order.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  address: string;
  @Column({unique: true})
  email: string;


  @Column({
    type : 'enum',
    enum : UserRoles,
    default : UserRoles.USER
  })
  role : string;
  @Column()
  @Exclude()
  password: string;
  @Column({ })
  @Exclude()
  salt: string;
  @Exclude()
  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
