import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { AlbumModule } from '../album/album.module';
import { FavouritesModule } from '../favourites/favourites.module';
import { ArtistModule } from '../artist/artist.module';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule, forwardRef(() => FavouritesModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
