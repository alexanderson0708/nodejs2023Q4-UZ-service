import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { LoggerModule } from './resourses/logger/logger.module';
import { HttpExceptionFilter } from './resourses/logger/http-exception-filter';
import { LoggerMiddleware } from './resourses/logger/logger.middleware';

@Module({
  imports: [
    AlbumModule,
    ArtistModule,
    FavouritesModule,
    TrackModule,
    UserModule,
    AuthModule,
    LoggerModule,
    TypeOrmModule.forRoot(SourceData.options),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
