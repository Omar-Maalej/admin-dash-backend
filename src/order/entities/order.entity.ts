import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  total : number

  @ManyToOne(() => User, user => user.orders, {eager : true})
  user : User;

  @ManyToMany(() => Product, product => product.orders, {eager : true})
  @JoinTable()
  products : Product[];
}
