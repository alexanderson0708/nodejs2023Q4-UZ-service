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
import { FavouritesEntity } from './entities/favourites.entity';

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
    const { artists, albums, tracks } = this.db.favourites;

    const favourites: FavouritesEntity = {
      artists: [],
      albums: [],
      tracks: [],
    };

    artists.forEach((id) => {
      const artist = this.db.artists.find((artist) => artist.id === id);
      favourites.artists.push(artist);
    });

    albums.forEach((id) => {
      const album = this.db.albums.find((album) => album.id === id);
      favourites.albums.push(album);
    });

    tracks.forEach((id) => {
      const track = this.db.tracks.find((track) => track.id === id);
      favourites.tracks.push(track);
    });
    return favourites;
  }

  async add(id: string, entityType: string) {
    const entity = await this[`${entityType}Service`].findOne(id);
    if (!entity)
      throw new HttpException(
        `${entityType.toUpperCase()} with id:${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.db.favourites[`${entityType}s`].push(id);
    return { message: `${entityType.toUpperCase()} successfully added` };
  }

  async remove(id: string, entityType: string, flag: boolean) {
    try {
      const entityIdx = this.db.favourites[`${entityType}s`].findIndex(
        (entityId) => entityId === id,
      );
      if (entityIdx === -1 && !flag)
        throw new HttpException(
          `${entityType.toUpperCase()} with id:${id} is not favorite`,
          HttpStatus.NOT_FOUND,
        );
      this.db.favourites[`${entityType}s`].splice(entityIdx, 1);
      return { message: `${entityType.toUpperCase()} successfully deleted` };
    } catch (e) {}
  }

  async addAlbum(id: string) {
    return await this.add(id, 'album');
  }
  async addTrack(id: string) {
    return await this.add(id, 'track');
  }
  async addArtist(id: string) {
    return await this.add(id, 'artist');
  }

  async removeAlbum(id: string, flag = false) {
    return await this.remove(id, 'album', flag);
  }
  async removeTrack(id: string, flag = false) {
    return await this.remove(id, 'track', flag);
  }
  async removeArtist(id: string, flag = false) {
    return await this.remove(id, 'artist', flag);
  }
}
