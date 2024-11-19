import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  address: string;
  @IsEmail()
  email: string;
  @IsString()
  role: string;
  password: string;
}

/* json : {
  "firstName": "John",
  "lastName": "Doe",
  "adress": "1234 Main St",
  "email": "
  "role": "admin",
  "password": "password"
 } */