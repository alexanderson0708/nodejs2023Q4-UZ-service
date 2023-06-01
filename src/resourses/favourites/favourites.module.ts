import { forwardRef, Module } from '@nestjs/common';
import { FavouritesController } from './favourites.controller';
import { FavouritesService } from './favourites.service';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [
    DbModule,
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
  ],
  controllers: [FavouritesController],
  providers: [FavouritesService],
  exports: [FavouritesService],
})
export class FavouritesModule {}
