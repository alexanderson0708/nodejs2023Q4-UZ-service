import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryDb } from '../../db/db.service.db';
import { TrackEntity } from './entities/track.entity';
import { FavouritesService } from '../favourites/favourites.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Injectable()
export class TrackService {
  constructor(
    private db: InMemoryDb,
    @Inject(forwardRef(() => FavouritesService))
    private readonly favouritesService: FavouritesService,
  ) {}

  async findAll(): Promise<TrackEntity[]> {
    return this.db.tracks;
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track = this.db.tracks.find(({ id: userId }) => userId === id);
    return track ?? null;
  }

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const newTrack = {
      id: uuidv4(),
      ...createTrackDto,
    };

    this.db.tracks.push(newTrack);

    return newTrack;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const trackIdx = this.db.tracks.findIndex((track) => track.id === id);
    if (trackIdx === -1) this.notFound(id, 'track');
    this.db.tracks[trackIdx] = {
      ...this.db.tracks[trackIdx],
      ...updateTrackDto,
    };

    return this.db.tracks[trackIdx];
  }

  async delete(id: string): Promise<TrackEntity> {
    const trackIdx = this.db.tracks.findIndex((track) => track.id === id);
    if (trackIdx === -1) this.notFound(id, 'track');

    await this.favouritesService.removeTrack(id, true);

    const [deletedTrack] = this.db.tracks.splice(trackIdx, 1);
    return deletedTrack;
  }

  async removeArtistId(id: string) {
    this.db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }

  async removeAlbumId(id: string) {
    this.db.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }

  private notFound(id: string, entity: string) {
    throw new HttpException(
      `${entity.toUpperCase()} with id:${id} is not exist`,
      HttpStatus.NOT_FOUND,
    );
  }
}
