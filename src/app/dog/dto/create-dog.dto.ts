import {ApiProperty} from '@nestjs/swagger';
import {IsDateString, IsNotEmpty, IsString} from 'class-validator';

export class CreateDogDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  bornAt: Date;
}