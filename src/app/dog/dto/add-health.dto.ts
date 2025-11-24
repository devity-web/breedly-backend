import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class AddHealthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  kind: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  who: string;
}
