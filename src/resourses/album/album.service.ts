import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { FavouritesService } from '../favourites/favourites.service';
import { InMemoryDb } from '../../db/db.service';
import { ModuleRef } from '@nestjs/core';
import { TrackService } from '../track/track.service';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService implements OnModuleInit {
  private trackService: TrackService;
  private artistService: ArtistService;
  private favouritesService: FavouritesService;

  constructor(private db: InMemoryDb, private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.trackService = this.moduleRef.get(TrackService, { strict: false });
    this.artistService = this.moduleRef.get(ArtistService, { strict: false });
    this.favouritesService = this.moduleRef.get(FavouritesService, {
      strict: false,
    });
  }

  async findAll(): Promise<AlbumEntity[]> {
    return this.db.albums;
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = this.db.albums.find(({ id: userId }) => userId === id);
    if (!album) throw new NotFoundException(`Album with id:${id} is not exist`);
    return album;
  }
}
