import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Product]),
    AuthModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports : [TypeOrmModule.forFeature([Product])]
})
export class ProductModule {}
