import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', type: 'varchar' })
  name: string;
  @Column({ name: 'year', type: 'int' })
  year: number;
  @Column({ name: 'artistId', type: 'varchar', default: null })
  artistId: string | null;
  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;
}
