import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
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
      imports: [PrismaModule, ConfigModule],
      inject: [PrismaService, ConfigService],
      useFactory: (
        prismaService: PrismaService,
        configService: ConfigService,
      ) => {
        return {
          auth: betterAuth({
            database: prismaAdapter(prismaService, {
              provider: 'postgresql',
            }),
            emailAndPassword: {
              enabled: true,
            },
            trustedOrigins: [
              configService.getOrThrow<string>('AUTH_TRUSTED_ORIGIN'),
            ],
            baseURL: configService.getOrThrow<string>('AUTH_BASE_URL'),
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
