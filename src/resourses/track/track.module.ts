import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { FavouritesModule } from '../favourites/favourites.module';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule, forwardRef(() => FavouritesModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
