import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from '../track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, ArtistEntity]),
    forwardRef(() => TrackModule),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
