import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { FavouritesService } from '../favourites/favourites.service';
import { InMemoryDb } from '../../db/db.service.db';
import { TrackService } from '../track/track.service';
import { ArtistEntity } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private db: InMemoryDb,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavouritesService))
    private favouritesService: FavouritesService,
  ) {}

  async findAll(): Promise<ArtistEntity[]> {
    return this.db.artists;
  }

  async findOne(id: string): Promise<ArtistEntity> {
    const artist = this.db.artists.find((artist) => artist.id === id);
    return artist ?? null;
  }

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.db.artists.push(newArtist);

    return newArtist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artistIdx = this.db.artists.findIndex((artist) => artist.id === id);
    if (artistIdx === -1) this.notFound(id, 'artist');

    this.db.artists[artistIdx] = {
      ...this.db.artists[artistIdx],
      ...updateArtistDto,
    };

    return this.db.artists[artistIdx];
  }

  async delete(id: string): Promise<ArtistEntity> {
    const artistIdx = this.db.artists.findIndex((artist) => artist.id === id);
    if (artistIdx === -1) this.notFound(id, 'artist');

    await this.albumService.removeArtistId(id);
    await this.trackService.removeArtistId(id);
    await this.favouritesService.removeArtist(id);

    const [deletedArtist] = this.db.artists.splice(artistIdx, 1);
    return deletedArtist;
  }

  private notFound(id: string, entity: string) {
    throw new HttpException(
      `${entity.toUpperCase()} with id:${id} is not exist`,
      HttpStatus.NOT_FOUND,
    );
  }
}
