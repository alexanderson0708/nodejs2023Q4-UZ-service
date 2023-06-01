import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryDb } from '../../db/db.service';
import { TrackEntity } from './entities/track.entity';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { FavouritesService } from '../favourites/favourites.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Injectable()
export class TrackService {
  constructor(
    private db: InMemoryDb,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
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
    const { albumId, artistId } = createTrackDto;
    if (albumId) {
      const album = await this.albumService.findOne(albumId);
      if (!album) this.notFound(albumId, 'album');
    }
    if (artistId) {
      const artist = await this.artistService.findOne(artistId);
      if (!artist) this.notFound(artistId, 'artist');
    }

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
    const { albumId, artistId } = updateTrackDto;
    const trackIdx = this.db.tracks.findIndex((track) => track.id === id);
    if (trackIdx === -1) this.notFound(id, 'track');
    if (albumId) {
      const album = await this.albumService.findOne(albumId);
      if (!album) this.notFound(albumId, 'album');
    }
    if (artistId) {
      const artist = await this.artistService.findOne(artistId);
      if (!artist) this.notFound(artistId, 'artist');
    }

    this.db.tracks[trackIdx] = {
      ...this.db.tracks[trackIdx],
      ...updateTrackDto,
    };

    return this.db.tracks[trackIdx];
  }

  async delete(id: string): Promise<TrackEntity> {
    const trackIdx = this.db.tracks.findIndex((track) => track.id === id);
    if (trackIdx === -1) this.notFound(id, 'track');

    await this.favouritesService.removeTrack(id);

    const [deletedTrack] = this.db.tracks.splice(trackIdx, 1);
    return deletedTrack;
  }

  private notFound(id: string, entity: string) {
    throw new HttpException(
      `${entity.toUpperCase()} with id:${id} is not exist`,
      HttpStatus.NOT_FOUND,
    );
  }
}
