import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistEntity } from './entities/artist.entity';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepo: Repository<ArtistEntity>,
  ) {}

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepo.find();
  }

  async findOne(id: string): Promise<ArtistEntity> {
    const artist = this.artistRepo.findOneBy({ id });
    return artist ?? null;
  }

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist = this.artistRepo.create(createArtistDto);
    return await this.artistRepo.save(newArtist);
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.artistRepo.findOneBy({ id });
    if (!artist) this.notFound(id, 'artist');
    const updateArtist = Object.assign(artist, updateArtistDto);
    return await this.artistRepo.save(updateArtist);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.artistRepo.delete(id);
    if (!artist.affected) this.notFound(id, 'artist');
    return;
  }

  private notFound(id: string, entity: string) {
    throw new HttpException(
      `${entity.toUpperCase()} with id:${id} is not exist`,
      HttpStatus.NOT_FOUND,
    );
  }
}
