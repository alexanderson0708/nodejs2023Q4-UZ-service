import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InMemoryDb } from '../../db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { TrackEntity } from './entities/track.entity';
import { CreateTrackDto } from './dto/createTrack.dto';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { FavouritesService } from '../favourites/favourites.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class TrackService implements OnModuleInit {
  private albumService: AlbumService;
  private artistService: ArtistService;
  private favouritesService: FavouritesService;

  constructor(private db: InMemoryDb, private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.albumService = this.moduleRef.get(AlbumService, { strict: false });
    this.artistService = this.moduleRef.get(ArtistService, { strict: false });
    this.favouritesService = this.moduleRef.get(FavouritesService, {
      strict: false,
    });
  }

  async findAll(): Promise<TrackEntity[]> {
    return this.db.tracks;
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track = this.db.tracks.find(({ id: userId }) => userId === id);
    if (!track) throw new NotFoundException(`Track with id:${id} is not exist`);
    return track;
  }

  // async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
  //
  // }
  //
  // async update(id: string, UpdateTrackDto: UpdateTrackDto): Promise<TrackEntity> {
  //
  // }
  //
  // async delete(id: string): Promise<TrackEntity> {
  //
  // }
}
