import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {PrismaService} from '@utils/prisma.service';
import {AddCustomerDto} from './dto/add-customer.dto';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    this.logger.log(`Find one customer with id: ${id}`);
    const customer = await this.prisma.customer.findUnique({
      where: {id},
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async findAll() {
    this.logger.log('Find all customers');
    return this.prisma.customer.findMany();
  }

  async create(data: AddCustomerDto) {
    this.logger.log('Create a new customer with body', data);
    const customer = await this.prisma.customer.create({
      data,
    });

    return customer;
  }
}
