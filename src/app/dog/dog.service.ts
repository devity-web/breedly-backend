import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Dog} from './dog.entity';
import {AddHealthDto} from './dto/add-health.dto';
import {AddWeightDto} from './dto/add-weight.dto';
import {CreateDogDto} from './dto/create-dog.dto';
import {EditDogDto} from './dto/edit-dog.dto';
import {Health} from './health.entity';
import {Weight} from './weight.entity';

@Injectable()
export class DogService {
  private readonly logger = new Logger(DogService.name);

  constructor(
    @InjectRepository(Dog)
    private dogsRepository: Repository<Dog>,
    @InjectRepository(Weight)
    private weightsRepository: Repository<Weight>,
    @InjectRepository(Health)
    private healthsRepository: Repository<Health>,
  ) {}

  async findOne(id: string) {
    this.logger.log(`Find one dog with id: ${id}`);
    const dog = await this.dogsRepository.findOne({
      order: {
        weights: {
          createdAt: 'DESC',
        },
      },
      where: {id},
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    return dog;
  }

  async findAll() {
    this.logger.log('Find all dogs');
    return this.dogsRepository.find();
  }

  async create(body: CreateDogDto) {
    this.logger.log('Create a new dog with body', body);
    const dog = this.dogsRepository.create(body);
    return this.dogsRepository.save(dog);
  }

  async addWeight(id: string, body: AddWeightDto) {
    this.logger.log(
      `Add weight to dog with id: ${id} and body: ${JSON.stringify(body)}`,
    );
    const dog = await this.findOne(id);

    const weight = this.weightsRepository.create({...body, dog});
    await this.weightsRepository.save(weight);

    dog.weights.push(weight);

    return this.dogsRepository.save(dog);
  }

  async addHealth(id: string, body: AddHealthDto) {
    this.logger.log(
      `Add health to dog with id: ${id} and body: ${JSON.stringify(body)}`,
    );
    const dog = await this.findOne(id);

    const health = this.healthsRepository.create({...body, dog});
    await this.healthsRepository.save(health);

    dog.healths.push(health);

    return this.dogsRepository.save(dog);
  }

  async update(id: string, body: EditDogDto) {
    await this.findOne(id);
    this.logger.log(
      `Update dog with id: ${id} and body: ${JSON.stringify(body)}`,
    );

    const dog = await this.dogsRepository.save({id, ...body});

    return dog;
  }
}
