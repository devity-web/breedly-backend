import {Module} from '@nestjs/common';
import {PrismaService} from '@utils/prisma.service';
import {DashboardController} from './dashboard.controller';
import {DashboardService} from './dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [PrismaService, DashboardService],
  exports: [],
})
export class DashboardModule {}
