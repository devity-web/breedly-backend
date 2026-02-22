import {Module} from '@nestjs/common';
import {PrismaService} from '@utils/prisma.service.js';
import {DogController} from './dog.controller.js';
import {DogService} from './dog.service.js';

@Module({
  controllers: [DogController],
  providers: [PrismaService, DogService],
  exports: [],
})
export class DogModule {}
