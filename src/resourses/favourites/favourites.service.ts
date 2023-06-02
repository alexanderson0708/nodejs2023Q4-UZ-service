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

    const favourites: FavouritesEntity = new FavouritesEntity();

    favourites.artists = artists.map((id) =>
      this.db.artists.find((artist) => artist.id === id),
    );

    favourites.albums = albums.map((id) =>
      this.db.albums.find((album) => album.id === id),
    );

    favourites.tracks = tracks.map((id) =>
      this.db.tracks.find((track) => track.id === id),
    );

    return favourites;
  }

  async add(id: string, entityType: string) {
    const entity = await this[`${entityType}Service`].findOne(id);
    if (!entity)
      throw new HttpException(
        `${entityType.toUpperCase()} with id:${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    await this.db.favourites[`${entityType}s`].push(id);
    console.log(`Create: ${!entity}`, this.db.favourites);
    return {
      message: `${entityType.toUpperCase()} successfully added to favourites`,
    };
  }

  async remove(id: string, entityType: string, flag: boolean) {
    const entityIdx = await this.db.favourites[`${entityType}s`].findIndex(
      (entityId) => entityId === id,
    );
    if (entityIdx === -1 && !flag) {
      throw new HttpException(
        `${entityType.toUpperCase()} with id:${id} is not favorite`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.db.favourites[`${entityType}s`].splice(entityIdx, 1);
    }
    console.log(`Delete: ${entityIdx}`, this.db.favourites);
    return { message: `${entityType.toUpperCase()} successfully deleted` };
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
