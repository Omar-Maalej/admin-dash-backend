import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Query, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { Response } from 'express';
import { OrderResponseDto } from './dto/order-response.dto';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll(@Query('range') range: string, @Res() res: Response) {
    const parsedRange = JSON.parse(range || '[0, 10]');
    const [start, end] = parsedRange;
    const [orders, total] = await this.orderService.findAll(start, end - start + 1);

    res.set('Content-Range', `orders ${start}-${end}/${total}`);
    return res.json(orders);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
