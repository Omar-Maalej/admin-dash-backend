import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "./user-roles.enum";
import { Order } from "src/order/entities/order.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  adress: string;
  @Column({unique: true})
  email: string;



  @Column({
    type : 'enum',
    enum : UserRoles,
    default : UserRoles.USER
  })
  role : string;
  @Column()
  password: string;
  @Column({ })
  salt: string;
  
  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
