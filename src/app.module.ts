import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './resourses/album/album.module';
import { ArtistModule } from './resourses/artist/artist.module';
import { FavouritesModule } from './resourses/favourites/favourites.module';
import { TrackModule } from './resourses/track/track.module';
import { UserModule } from './resourses/user/user.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    AlbumModule,
    ArtistModule,
    FavouritesModule,
    TrackModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
