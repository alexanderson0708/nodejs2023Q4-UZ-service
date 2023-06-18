import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavAlbumEntity } from './entities/favAlbum.entity';
import { FavArtistEntity } from './entities/favArtist.entity';
import { FavTrackEntity } from './entities/favTrack.entity';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(FavAlbumEntity)
    private favAlbumRepo: Repository<FavAlbumEntity>,
    @InjectRepository(FavArtistEntity)
    private favArtistRepo: Repository<FavArtistEntity>,
    @InjectRepository(FavTrackEntity)
    private favTrackRepo: Repository<FavTrackEntity>,
  ) {}

  async findAll() {
    const [favAlbum, favArtist, favTrack] = await Promise.all([
      this.favAlbumRepo.find({ relations: { album: true } }),
      this.favArtistRepo.find({ relations: { artist: true } }),
      this.favTrackRepo.find({ relations: { track: true } }),
    ]);
    const albums = favAlbum.map((el) => el.album);
    const artists = favArtist.map((el) => el.artist);
    const tracks = favTrack.map((el) => el.track);

    return { albums, artists, tracks };
  }

  async addAlbum(id: string) {
    const album = await this.favAlbumRepo.create({ albumId: id });
    await this.favAlbumRepo.save(album);
    return { message: `Album with id:${id} has been added to favourites` };
  }
  async addTrack(id: string) {
    const track = await this.favTrackRepo.create({ trackId: id });
    await this.favTrackRepo.save(track);
    return { message: `Track with id:${id} has been added to favourites` };
  }
  async addArtist(id: string) {
    const artist = await this.favArtistRepo.create({ artistId: id });
    await this.favArtistRepo.save(artist);
    return { message: `Artist with id:${id} has been added to favourites` };
  }

  async removeAlbum(id: string) {
    const album = await this.favAlbumRepo.delete({ albumId: id });
    if (!album.affected) throw this.notFound(id, 'album');
    return { message: `Album with id:${id} has been removed from favourites` };
  }
  async removeArtist(id: string) {
    const artist = await this.favArtistRepo.delete({ artistId: id });
    if (!artist.affected) throw this.notFound(id, 'artist');
    return { message: `Artist with id:${id} has been removed from favourites` };
  }
  async removeTrack(id: string) {
    const track = await this.favTrackRepo.delete({ trackId: id });
    if (!track.affected) throw this.notFound(id, 'track');
    return { message: `Track with id:${id} has been removed from favourites` };
  }
  private notFound(id: string, entity: string) {
    throw new HttpException(
      `${entity.toUpperCase()} with id:${id} does not exist in favourites`,
      HttpStatus.NOT_FOUND,
    );
  }
}
