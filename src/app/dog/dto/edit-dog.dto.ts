import {ApiProperty} from '@nestjs/swagger';
import {IsOptional, IsString} from 'class-validator';

export class EditDogDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  assignedName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  passport: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  chipId: string;
}
