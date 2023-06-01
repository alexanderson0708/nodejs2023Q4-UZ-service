import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from '../track/track.module';
import { FavouritesModule } from '../favourites/favourites.module';
import { ArtistModule } from '../artist/artist.module';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [
    DbModule,
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavouritesModule),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
