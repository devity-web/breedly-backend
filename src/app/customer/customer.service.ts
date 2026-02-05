import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Customer} from './customer.entity';
import {AddCustomerDto} from './dto/add-customer.dto';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findOne(id: string) {
    this.logger.log(`Find one customer with id: ${id}`);
    const customer = await this.customerRepository.findOne({
      where: {id},
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async findAll() {
    this.logger.log('Find all customers');
    return this.customerRepository.find();
  }

  async create(body: AddCustomerDto) {
    this.logger.log('Create a new customer with body', body);
    const customer = this.customerRepository.create(body);
    return this.customerRepository.save(customer);
  }
}
