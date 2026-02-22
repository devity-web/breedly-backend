import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {PrismaModule} from '@utils/prisma.module.js';
import {PrismaService} from '@utils/prisma.service.js';
import {betterAuth} from 'better-auth';
import {prismaAdapter} from 'better-auth/adapters/prisma';
import {AuthModule} from './app/auth/auth.module.js';
import {CustomerModule} from './app/customer/customer.module.js';
import {DashboardModule} from './app/dashboard/dashboard.module.js';
import {DogModule} from './app/dog/dog.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule.forRootAsync({
      imports: [PrismaModule, ConfigModule],
      inject: [PrismaService, ConfigService],
      useFactory: async (
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
            socialProviders: {
              google: {
                clientId: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
                clientSecret: configService.getOrThrow<string>(
                  'GOOGLE_CLIENT_SECRET',
                ),
              },
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
