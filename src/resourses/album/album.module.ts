import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { DbModule } from '../../db/db.module';
import { TrackModule } from '../track/track.module';
import { FavouritesModule } from '../favourites/favourites.module';

@Module({
  imports: [
    DbModule,
    forwardRef(() => TrackModule),
    forwardRef(() => FavouritesModule),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports:[AlbumService]
})
export class AlbumModule {}
