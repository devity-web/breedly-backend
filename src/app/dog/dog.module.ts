import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DogController} from './dog.controller';
import {Dog} from './dog.entity';
import {DogService} from './dog.service';
import {Health} from './health.entity';
import {Weight} from './weight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dog, Weight, Health])],
  controllers: [DogController],
  providers: [DogService],
  exports: [],
})
export class DogModule {}
