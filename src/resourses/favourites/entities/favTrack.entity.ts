import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackEntity } from '../../track/entities/track.entity';

@Entity('fav_track')
export class FavTrackEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ name: 'trackId', type: 'uuid' })
  trackId: string | null;
  @ManyToOne(() => TrackEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trackId', referencedColumnName: 'id' })
  track: TrackEntity;
}
