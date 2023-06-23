import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './resourses/album/album.module';
import { ArtistModule } from './resourses/artist/artist.module';
import { FavouritesModule } from './resourses/favourites/favourites.module';
import { TrackModule } from './resourses/track/track.module';
import { UserModule } from './resourses/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceData } from './ormconfig';
import { AuthModule } from './resourses/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './resourses/auth/guards/auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AlbumModule,
    ArtistModule,
    FavouritesModule,
    TrackModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(SourceData.options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
