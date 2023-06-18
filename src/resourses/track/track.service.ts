import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrackEntity } from './entities/track.entity';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepo: Repository<TrackEntity>,
  ) {}

  async findAll(): Promise<TrackEntity[]> {
    return await this.trackRepo.find();
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track = await this.trackRepo.findOneBy({ id });
    return track ?? null;
  }

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const newTrack = this.trackRepo.create(createTrackDto);
    return await this.trackRepo.save(newTrack);
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track = await this.trackRepo.findOneBy({ id });
    if (!track) this.notFound(id, 'track');
    const updateTrack = Object.assign(track, updateTrackDto);
    return await this.trackRepo.save(updateTrack);
  }

  async delete(id: string): Promise<void> {
    const track = await this.trackRepo.delete(id);
    if (!track.affected) this.notFound(id, 'track');
    return;
  }

  private notFound(id: string, entity: string) {
    throw new HttpException(
      `${entity.toUpperCase()} with id:${id} is not exist`,
      HttpStatus.NOT_FOUND,
    );
  }
}
