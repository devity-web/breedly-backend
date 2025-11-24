import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CustomerModule} from './app/customer/customer.module';
import {DogModule} from './app/dog/dog.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'breedly',
      synchronize: true,
      autoLoadEntities: true,
    }),
    DogModule,
    CustomerModule,
  ],
})
export class AppModule {}
