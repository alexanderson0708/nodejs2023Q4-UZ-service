import { Injectable } from '@nestjs/common';
import AlbumModel from '../resourses/album/model/album.model';
import ArtistModel from '../resourses/artist/model/artist.model';
import TrackModel from '../resourses/track/model/track.model';
import UserModel from '../resourses/user/model/user.model';

class FavouriteModel {}

@Injectable()
export class InMemoryDb {
  artists: ArtistModel[] = [];
  albums: AlbumModel[] = [];
  tracks: TrackModel[] = [];
  users: UserModel[] = [];
  favourites: FavouriteModel = {
    artists: [],
    tracks: [],
    album: [],
  };
}
