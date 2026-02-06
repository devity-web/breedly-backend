import {Module} from '@nestjs/common';
import {PrismaService} from '@utils/prisma.service';
import {DogController} from './dog.controller';
import {DogService} from './dog.service';

@Module({
  controllers: [DogController],
  providers: [PrismaService, DogService],
  exports: [],
})
export class DogModule {}
