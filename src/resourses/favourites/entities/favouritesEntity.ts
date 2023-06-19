import { ArtistEntity } from '../../artist/entities/artist.entity';
import { AlbumEntity } from '../../album/entities/album.entity';
import { TrackEntity } from '../../track/entities/track.entity';
import { Column } from 'typeorm';
import { Exclude } from 'class-transformer';

export class FavouritesEntity {
  @Exclude()
  id: string;

  @Column('uuid', { array: true, default: {} })
  albums: AlbumEntity[];
  @Column('uuid', { array: true, default: {} })
  artists: ArtistEntity[];
  @Column('uuid', { array: true, default: {} })
  tracks: TrackEntity[];
}
