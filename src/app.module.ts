import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {CustomerModule} from './app/customer/customer.module';
import {DogModule} from './app/dog/dog.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DogModule,
    CustomerModule,
  ],
})
export class AppModule {}
