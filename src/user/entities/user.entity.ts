import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "./user-roles.enum";

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
  // TODO orders : Order[];
}
