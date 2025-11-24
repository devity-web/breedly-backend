import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber} from 'class-validator';

export class AddWeightDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  value: number;
}
