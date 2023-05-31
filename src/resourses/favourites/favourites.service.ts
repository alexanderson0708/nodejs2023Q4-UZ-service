import { Injectable } from '@nestjs/common';
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
    const favourites = new FavouritesEntity();

    favourites.albums = [];
    favourites.tracks = [];
    favourites.artists = [];

    const { albums, artists, tracks } = this.db.favourites;

    albums.forEach((id) => {
      const album = this.db.albums.find((album) => album.id === id);
      favourites.albums.push(album);
    });

    artists.forEach((id) => {
      const artist = this.db.artists.find((artist) => artist.id === id);
      favourites.artists.push(artist);
    });

    tracks.forEach((id) => {
      const track = this.db.tracks.find((track) => track.id === id);
      favourites.tracks.push(track);
    });

    return favourites;
  }
}
