import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InMemoryDb } from '../../db/db.service.db';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavouritesService {
  constructor(
    private db: InMemoryDb,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}
  findAll() {
    return this.db.favourites;
  }

  async add(id: string, entityType: string) {
    const entity = await this[`${entityType}Service`].findOne(id);
    if (!entity)
      throw new HttpException(
        `${entityType.toUpperCase()} with id:${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.db.favourites[`${entityType}`].push(entity.id);
    return { message: `${entityType.toUpperCase()} successfully added` };
  }

  async remove(id: string, entityType: string) {
    const entityIdx = await this.db.favourites[
      `${entityType}Service`
    ].findIndex((entityId) => entityId === id);
    if (entityIdx === -1)
      throw new HttpException(
        `${entityType.toUpperCase()} with id:${id} is not favorite`,
        HttpStatus.NOT_FOUND,
      );
    this.db.favourites[`${entityType}`].splice(entityIdx, 1);
    return { message: `${entityType.toUpperCase()} successfully deleted` };
  }

  async addAlbum(id: string) {
    return this.add(id, 'album');
  }
  async addTrack(id: string) {
    return this.add(id, 'track');
  }
  async addArtist(id: string) {
    return await this.add(id, 'artist');
  }

  async removeAlbum(id: string) {
    return await this.remove(id, 'album');
  }
  async removeTrack(id: string) {
    return await this.remove(id, 'track');
  }
  async removeArtist(id: string) {
    return await this.remove(id, 'artist');
  }
}
