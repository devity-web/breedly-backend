import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {PrismaService} from '@utils/prisma.service';
import {AddHealthDto} from './dto/add-health.dto';
import {AddWeightDto} from './dto/add-weight.dto';
import {CreateDogDto} from './dto/create-dog.dto';
import {EditDogDto} from './dto/edit-dog.dto';

@Injectable()
export class DogService {
  private readonly logger = new Logger(DogService.name);

  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    this.logger.log(`Find one dog with id: ${id}`);
    const dog = await this.prisma.dog.findUnique({
      // order: {
      //   weights: {
      //     createdAt: 'DESC',
      //   },
      // },
      where: {id},
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    return dog;
  }

  async findAll() {
    this.logger.log('Find all dogs');
    return this.prisma.dog.findMany();
  }

  async create(data: CreateDogDto) {
    this.logger.log('Create a new dog with body', data);
    const dog = await this.prisma.dog.create({
      data,
    });
    return dog;
  }

  async addWeight(id: string, body: AddWeightDto) {
    this.logger.log(
      `Add weight to dog with id: ${id} and body: ${JSON.stringify(body)}`,
    );
    const dog = await this.findOne(id);
    const weight = await this.prisma.weight.create({
      data: {
        ...body,
        dog: {
          connect: {
            id: dog.id,
          },
        },
      },
    });

    return weight;
  }

  async addHealth(id: string, body: AddHealthDto) {
    this.logger.log(
      `Add health to dog with id: ${id} and body: ${JSON.stringify(body)}`,
    );
    const dog = await this.findOne(id);

    const health = await this.prisma.health.create({
      data: {
        ...body,
        dog: {
          connect: {
            id: dog.id,
          },
        },
      },
    });

    return health;
  }

  async update(id: string, body: EditDogDto) {
    await this.findOne(id);
    this.logger.log(
      `Update dog with id: ${id} and body: ${JSON.stringify(body)}`,
    );

    const dog = await this.prisma.dog.update({
      data: body,
      where: {
        id,
      },
    });

    return dog;
  }
}
