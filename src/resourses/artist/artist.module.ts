import { forwardRef, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { FavouritesModule } from '../favourites/favourites.module';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [
    DbModule,
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavouritesModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
