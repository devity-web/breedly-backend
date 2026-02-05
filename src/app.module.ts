import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CustomerModule} from './app/customer/customer.module';
import {DogModule} from './app/dog/dog.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('PG_HOST'),
        port: configService.getOrThrow<number>('PG_PORT'),
        username: configService.getOrThrow<string>('PG_USER'),
        password: configService.getOrThrow<string>('PG_PASSWORD'),
        database: configService.getOrThrow<string>('PG_DB'),
        synchronize: configService.getOrThrow<boolean>('PG_SYNC'),
        autoLoadEntities: true,
      }),
    }),
    DogModule,
    CustomerModule,
  ],
})
export class AppModule {}
