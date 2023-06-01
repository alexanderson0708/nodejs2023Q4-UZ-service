import { forwardRef, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { InMemoryDb } from '../../db/db.service';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { FavouritesModule } from '../favourites/favourites.module';

@Module({
  imports: [
    InMemoryDb,
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavouritesModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
