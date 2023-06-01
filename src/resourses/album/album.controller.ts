import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumEntity } from './entities/album.entity';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { CreateAlbumDto } from './dto/createAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<AlbumEntity[]> {
    console.log(555);
    return this.albumService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ): Promise<AlbumEntity> {
    return await this.albumService.findOne(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    return this.albumService.create(createAlbumDto);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<AlbumEntity> {
    return this.albumService.delete(id);
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<AlbumEntity> {
    return this.albumService.update(id, updateAlbumDto);
  }
}
