import { Order } from "src/order/entities/order.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
   @PrimaryGeneratedColumn()
   id : number;
   
   @Column()
   name : string;

  @Column()
  description : string;

  @Column()
  price : number;

  @ManyToMany(() => Order, order => order.products)
  orders : Order[];
}
