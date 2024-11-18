export class CreateUserDto {
  firstName: string;
  lastName: string;
  adress: string;
  email: string;
  role: string;
  password: string;
}

// json : {
//   "firstName": "John",
//   "lastName": "Doe",
//   "adress": "1234 Main St",
//   "email": "
//   "role": "admin",
//   "password": "password"
// }