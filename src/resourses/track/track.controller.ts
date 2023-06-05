import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackEntity } from './entities/track.entity';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Controller('track')
@UseInterceptors(ClassSerializerInterceptor)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<TrackEntity[]> {
    return await this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
  ): Promise<TrackEntity> {
    const track = await this.trackService.findOne(id);
    if (!track)
      throw new HttpException(
        `Track with id:${id} is not found`,
        HttpStatus.NOT_FOUND,
      );
    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    return await this.trackService.create(createTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<TrackEntity> {
    return await this.trackService.delete(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<TrackEntity> {
    return await this.trackService.update(id, updateTrackDto);
  }
}
