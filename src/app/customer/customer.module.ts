import {Module} from '@nestjs/common';
import {PrismaService} from '@utils/prisma.service.js';
import {CustomerController} from './customer.controller.js';
import {CustomerService} from './customer.service.js';

@Module({
  controllers: [CustomerController],
  providers: [PrismaService, CustomerService],
  exports: [],
})
export class CustomerModule {}
