import {Injectable, Logger} from '@nestjs/common';
import {PrismaService} from '@utils/prisma.service.js';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(private prisma: PrismaService) {}

  async getStats() {
    this.logger.log('Get stats');
    const dogs = await this.prisma.dog.count();
    const customers = await this.prisma.customer.count();
    const photos = await this.prisma.photo.count();
    const poops = await this.prisma.poop.count();

    return {
      dogs,
      customers,
      photos,
      poops,
    };
  }
}
