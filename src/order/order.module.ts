import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [
    AuthModule,
    TypeOrmModule.forFeature([Order, User, Product]),

  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
