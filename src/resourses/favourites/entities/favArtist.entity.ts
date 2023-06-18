import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';

@Entity('fav_artist')
export class FavArtistEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ name: 'artistId', type: 'uuid' })
  artistId: string | null;
  @ManyToOne(() => ArtistEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;
}
