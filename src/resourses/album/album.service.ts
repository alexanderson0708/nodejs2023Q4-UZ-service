import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FavouritesService } from '../favourites/favourites.service';
import { InMemoryDb } from '../../db/db.service.db';
import { TrackService } from '../track/track.service';
import { AlbumEntity } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(
    private db: InMemoryDb,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavouritesService))
    private readonly favouritesService: FavouritesService,
  ) {}

  async findAll(): Promise<AlbumEntity[]> {
    return this.db.albums;
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = this.db.albums.find(({ id: albumId }) => albumId === id);
    return album ?? null;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const albumIdx = this.db.albums.findIndex((album) => album.id === id);
    if (albumIdx === -1) this.notFound(id, 'album');

    this.db.albums[albumIdx] = {
      ...this.db.albums[albumIdx],
      ...updateAlbumDto,
    };

    return this.db.albums[albumIdx];
  }

  async delete(id: string): Promise<AlbumEntity> {
    const albumIdx = this.db.albums.findIndex((album) => album.id === id);
    if (albumIdx === -1) this.notFound(id, 'album');

    const [deletedAlbum] = this.db.albums.splice(albumIdx, 1);

    await this.trackService.removeAlbumId(id);

    await this.favouritesService.removeAlbum(id, true);

    return deletedAlbum;
  }

  async removeArtistId(id: string) {
    this.db.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }
  private notFound(id: string, entity: string) {
    throw new HttpException(
      `${entity.toUpperCase()} with id:${id} is not exist`,
      HttpStatus.NOT_FOUND,
    );
  }
}
