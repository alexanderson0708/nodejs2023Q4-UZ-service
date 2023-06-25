import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumEntity } from './entities/album.entity';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../artist/entities/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepo: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepo: Repository<ArtistEntity>,
  ) {}

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepo.find();
  }

  async findOne(id: string): Promise<AlbumEntity> {
    return await this.albumRepo.findOneBy({ id });
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum = await this.albumRepo.create(createAlbumDto);
    return await this.albumRepo.save(newAlbum);
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album = await this.albumRepo.findOneBy({ id });
    if (!album) this.notFound(id, 'album');
    const updateAlbum = Object.assign({ id }, updateAlbumDto);
    return await this.albumRepo.save(updateAlbum);
  }

  async delete(id: string): Promise<void> {
    const album = await this.albumRepo.delete(id);
    if (!album.affected) this.notFound(id, 'album');
    return;
  }

  private notFound(id: string, entity: string) {
    throw new HttpException(
      `${entity.toUpperCase()} with id:${id} is not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
