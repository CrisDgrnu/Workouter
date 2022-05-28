import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeleteResult, UpdateResult } from 'typeorm';
import { SetDto, UpdateSetDto } from './dtos';
import { Set } from './models';
import { SetService } from './set.service';

@Controller('set')
export class SetController {
  constructor(private setService: SetService) {}

  @Post()
  async create(@Body() setDto: SetDto): Promise<Set> {
    return this.setService.create(setDto);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Set>> {
    return this.setService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Set> {
    return this.setService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatesetDto: UpdateSetDto,
  ): Promise<UpdateResult> {
    return this.setService.update(id, updatesetDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.setService.remove(id);
  }
}
