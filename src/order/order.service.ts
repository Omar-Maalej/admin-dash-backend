import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { total, userId, productIds } = createOrderDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const products = await this.productRepository.findBy({id : In(productIds)});
    if (!products || products.length === 0 ) {
      throw new NotFoundException('No products found');
    }

    if(products.length != productIds.length) {
      throw new NotFoundException('Some products not found');
    }


    const order = this.orderRepository.create({
      total,
      user,
      products,
    });

 
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({where :  {id}});
    if(!order)
      throw new NotFoundException('Order not found');

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id,
      ...updateOrderDto
    });

    if(!order)
      throw new NotFoundException('Order not found');

    return this.orderRepository.save(order);
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
