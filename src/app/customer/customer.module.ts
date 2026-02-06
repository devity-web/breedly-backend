import {Module} from '@nestjs/common';
import {PrismaService} from '@utils/prisma.service';
import {CustomerController} from './customer.controller';
import {CustomerService} from './customer.service';

@Module({
  controllers: [CustomerController],
  providers: [PrismaService, CustomerService],
  exports: [],
})
export class CustomerModule {}
