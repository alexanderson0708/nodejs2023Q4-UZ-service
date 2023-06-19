import { DataSource } from 'typeorm';
import * as process from 'process';
import { AlbumEntity } from './resourses/album/entities/album.entity';
import { ArtistEntity } from './resourses/artist/entities/artist.entity';
import { TrackEntity } from './resourses/track/entities/track.entity';
import 'dotenv/config';
import { FavArtistEntity } from './resourses/favourites/entities/favArtist.entity';
import { FavAlbumEntity } from './resourses/favourites/entities/favAlbum.entity';
import { FavTrackEntity } from './resourses/favourites/entities/favTrack.entity';
import { UserEntity } from './resourses/user/entities/user.entity';

export const SourceData = new DataSource({
  type: 'postgres',
  host: 'database',
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: [
    UserEntity,
    ArtistEntity,
    AlbumEntity,
    TrackEntity,
    FavTrackEntity,
    FavArtistEntity,
    FavAlbumEntity,
  ],
  migrations: ['dist/src/migrations/*.js'],
  migrationsRun: true,
});
