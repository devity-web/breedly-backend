import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CustomerService} from './customer.service.js';
import {AddCustomerDto} from './dto/add-customer.dto.js';

@Controller('customers')
@ApiTags('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Post()
  create(@Body() body: AddCustomerDto) {
    return this.customerService.create(body);
  }
}
