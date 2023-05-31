import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { FavouritesService } from '../favourites/favourites.service';
import { InMemoryDb } from '../../db/db.service';
import { ModuleRef } from '@nestjs/core';
import { TrackService } from '../track/track.service';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService implements OnModuleInit {
  private albumService: AlbumService;
  private trackService: TrackService;
  private favouritesService: FavouritesService;

  constructor(private db: InMemoryDb, private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.albumService = this.moduleRef.get(AlbumService, { strict: false });
    this.trackService = this.moduleRef.get(TrackService, { strict: false });
    this.favouritesService = this.moduleRef.get(FavouritesService, {
      strict: false,
    });
  }

  async findAll(): Promise<ArtistEntity[]> {
    return this.db.artists;
  }

  async findOne(id: string): Promise<ArtistEntity> {
    const artist = this.db.artists.find(({ id: userId }) => userId === id);
    if (!artist)
      throw new NotFoundException(`Artist with id:${id} is not exist`);
    return artist;
  }
}
