import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {PrismaService} from '@utils/prisma.service';
import {put} from '@vercel/blob';
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
      where: {id},
      include: {
        weights: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        poops: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        healths: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        photos: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        owner: true,
      },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    return dog;
  }

  async findAll() {
    this.logger.log('Find all dogs');
    return this.prisma.dog.findMany({
      include: {
        weights: true,
        healths: true,
        owner: true,
      },
    });
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

  async addPoop(id: string) {
    this.logger.log(`Add poop to dog with id: ${id} and body`);
    const dog = await this.findOne(id);

    const poop = await this.prisma.poop.create({
      data: {
        dog: {
          connect: {
            id: dog.id,
          },
        },
      },
    });

    return poop;
  }

  async addPhoto(id: string, file: Express.Multer.File) {
    this.logger.log(`Add photo to dog with id: ${id} and body`);
    const dog = await this.findOne(id);
    const {url} = await put(`photos/${Date.now()}.jpg`, file.buffer, {
      access: 'public',
    });

    const photo = await this.prisma.photo.create({
      data: {
        url,
        dog: {
          connect: {
            id: dog.id,
          },
        },
      },
    });

    return photo;
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
