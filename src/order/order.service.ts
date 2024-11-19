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

  async findAll(skip: number, take: number): Promise<[Order[], number]> {
    return  await this.orderRepository.findAndCount({ skip, take });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({where :  {id}});
    if(!order)
      throw new NotFoundException('Order not found');

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const { total, userId, productIds } = updateOrderDto;
  
    const existingOrder = await this.orderRepository.findOne({ where: { id }, relations: ['user', 'products'] });
    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }
  
    let user = existingOrder.user;
    if (userId && userId !== existingOrder.user.id) {
      user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
    }
  
    let products = existingOrder.products;
    if (productIds && productIds.length > 0) {
      products = await this.productRepository.findBy({ id: In(productIds) });
      if (!products || products.length === 0) {
        throw new NotFoundException('No products found');
      }
  
      if (products.length !== productIds.length) {
        throw new NotFoundException('Some products not found');
      }
    }
  
    const updatedOrder = this.orderRepository.create({
      id, // Include the ID for update
      total: total ?? existingOrder.total,
      user,
      products,
    });
  
    return this.orderRepository.save(updatedOrder);
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
