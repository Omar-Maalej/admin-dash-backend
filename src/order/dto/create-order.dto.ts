import { IsNumber } from "class-validator";

export class CreateOrderDto {
  @IsNumber()
  total : number;

  @IsNumber()
  userId: number;

  @IsNumber({}, {each: true})
  productIds: number[];
}
