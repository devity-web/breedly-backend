import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CustomerController} from './customer.controller';
import {Customer} from './customer.entity';
import {CustomerService} from './customer.service';

@Module({
  controllers: [CustomerController],
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService],
  exports: [],
})
export class CustomerModule {}
