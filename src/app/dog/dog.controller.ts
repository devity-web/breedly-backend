import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiTags} from '@nestjs/swagger';
import {DogService} from './dog.service.js';
import {AddHealthDto} from './dto/add-health.dto.js';
import {AddWeightDto} from './dto/add-weight.dto.js';
import {CreateDogDto} from './dto/create-dog.dto.js';
import {EditDogDto} from './dto/edit-dog.dto.js';

@Controller('dogs')
@ApiTags('dogs')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Get()
  getAll() {
    return this.dogService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.dogService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateDogDto) {
    return this.dogService.create(body);
  }

  @Post('/:id/weight')
  addWeight(@Param('id') id: string, @Body() body: AddWeightDto) {
    return this.dogService.addWeight(id, body);
  }

  @Post('/:id/health')
  addHealth(@Param('id') id: string, @Body() body: AddHealthDto) {
    return this.dogService.addHealth(id, body);
  }

  @Post('/:id/poop')
  addPoop(@Param('id') id: string) {
    return this.dogService.addPoop(id);
  }

  @Post('/:id/photo')
  @UseInterceptors(FileInterceptor('file'))
  addPhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.dogService.addPhoto(id, file);
  }

  @Delete('/:id/photo/:photoId')
  deletePhoto(@Param('id') id: string, @Param('photoId') photoId: string) {
    return this.dogService.deletePhoto(id, photoId);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: EditDogDto) {
    return this.dogService.update(id, body);
  }
}
