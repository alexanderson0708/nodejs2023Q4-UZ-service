import { AlbumEntity } from '../../album/entities/album.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { TrackEntity } from '../../track/entities/track.entity';

export class FavouritesEntity {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
