import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {DogService} from './dog.service';
import {AddHealthDto} from './dto/add-health.dto';
import {AddWeightDto} from './dto/add-weight.dto';
import {CreateDogDto} from './dto/create-dog.dto';
import {EditDogDto} from './dto/edit-dog.dto';

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

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: EditDogDto) {
    return this.dogService.update(id, body);
  }
}
