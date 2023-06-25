import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { AlbumEntity } from '../../album/entities/album.entity';
@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', type: 'varchar' })
  name: string;
  @Column({ name: 'artistId', type: 'uuid', default: null })
  artistId: string | null;
  @Column({ name: 'albumId', type: 'uuid', default: null })
  albumId: string | null;
  @Column({ name: 'duration', type: 'int' })
  duration: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  album: AlbumEntity;
}
