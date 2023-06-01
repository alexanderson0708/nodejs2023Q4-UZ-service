import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { FavouritesService } from '../favourites/favourites.service';
import { InMemoryDb } from '../../db/db.service';
import { TrackService } from '../track/track.service';
import { AlbumEntity } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(
    private db: InMemoryDb,
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly favouritesService: FavouritesService,
  ) {}

  async findAll(): Promise<AlbumEntity[]> {
    return this.db.albums;
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = this.db.albums.find(({ id: userId }) => userId === id);
    return album ?? null;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    this.db.albums.push(newAlbum);

    return newAlbum;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const albumIdx = this.db.albums.findIndex((album) => album.id === id);
    if (albumIdx === -1) this.notFound(id, 'album');

    if (updateAlbumDto.artistId) {
      const artist = await this.artistService.findOne(updateAlbumDto.artistId);
      if (!artist) this.notFound(updateAlbumDto.artistId, 'artist');
    }

    this.db.albums[albumIdx] = {
      ...this.db.albums[albumIdx],
      ...updateAlbumDto,
    };

    return this.db.albums[albumIdx];
  }

  async delete(id: string): Promise<AlbumEntity> {
    const albumIdx = this.db.albums.findIndex((album) => album.id === id);
    if (albumIdx === -1) this.notFound(id, 'album');

    this.db.tracks = this.db.tracks.filter((track) => track.albumId !== id);

    await this.favouritesService.removeAlbum(id);

    const [deletedAlbum] = this.db.albums.splice(albumIdx, 1);
    return deletedAlbum;
  }

  private notFound(id: string, entity: string) {
    throw new HttpException(
      `${entity.toUpperCase()} with id:${id} is not exist`,
      HttpStatus.NOT_FOUND,
    );
  }
}
