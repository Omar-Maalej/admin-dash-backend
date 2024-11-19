import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Res, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(@Query('range') range: string, @Res() res: Response) {
    const parsedRange = JSON.parse(range || '[0, 10]');
    const [start, end] = parsedRange;
    const [products, total] = await this.productService.findAll(start, end - start + 1);
  
    res.set('Content-Range', `products ${start}-${end}/${total}`);
    return res.json(products);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
