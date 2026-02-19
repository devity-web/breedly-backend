import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from '@thallesp/nestjs-better-auth';
import {PrismaModule} from '@utils/prisma.module';
import {PrismaService} from '@utils/prisma.service';
import {betterAuth} from 'better-auth';
import {prismaAdapter} from 'better-auth/adapters/prisma';
import {CustomerModule} from './app/customer/customer.module';
import {DashboardModule} from './app/dashboard/dashboard.module';
import {DogModule} from './app/dog/dog.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule.forRootAsync({
      imports: [PrismaModule],
      inject: [PrismaService],
      useFactory: (prismaService: PrismaService) => {
        return {
          auth: betterAuth({
            database: prismaAdapter(prismaService, {
              provider: 'postgresql',
            }),
            emailAndPassword: {
              enabled: true,
            },
            trustedOrigins: ['http://localhost:5173'],
          }),
        };
      },
    }),
    DogModule,
    CustomerModule,
    DashboardModule,
  ],
})
export class AppModule {}
