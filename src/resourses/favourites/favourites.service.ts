import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryDb } from '../../db/db.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavouritesEntity } from './entities/favourites.entity';

@Injectable()
export class FavouritesService {
  constructor(
    private db: InMemoryDb,
    private albumService: AlbumService,
    private artistService: ArtistService,
    private trackService: TrackService,
  ) {}
  findAll(): FavouritesEntity {
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
    if (!entityIdx)
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
    return this.add(id, 'artist');
  }

  async removeAlbum(id: string) {
    return this.remove(id, 'album');
  }
  async removeTrack(id: string) {
    return this.remove(id, 'track');
  }
  async removeArtist(id: string) {
    return this.remove(id, 'artist');
  }
}
