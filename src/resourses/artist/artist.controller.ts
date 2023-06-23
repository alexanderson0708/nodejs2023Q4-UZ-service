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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistEntity } from './entities/artist.entity';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { CreateArtistDto } from './dto/createArtist.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@Controller('artist')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
  ): Promise<ArtistEntity> {
    const artist = await this.artistService.findOne(id);
    if (!artist)
      throw new HttpException(
        `Artist with id:${id} is not found`,
        HttpStatus.NOT_FOUND,
      );
    return artist;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return await this.artistService.create(createArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return await this.artistService.delete(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ArtistEntity> {
    return await this.artistService.update(id, updateArtistDto);
  }
}
