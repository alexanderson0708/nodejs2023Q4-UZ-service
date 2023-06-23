import { forwardRef, Module } from '@nestjs/common';
import { FavouritesController } from './favourites.controller';
import { FavouritesService } from './favourites.service';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavAlbumEntity } from './entities/favAlbum.entity';
import { FavArtistEntity } from './entities/favArtist.entity';
import { FavTrackEntity } from './entities/favTrack.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavAlbumEntity, FavArtistEntity, FavTrackEntity]),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    AuthModule,
  ],
  controllers: [FavouritesController],
  providers: [FavouritesService],
  exports: [FavouritesService],
})
export class FavouritesModule {}
