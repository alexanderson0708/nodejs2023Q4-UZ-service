import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';

@Entity('fav_album')
export class FavAlbumEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ name: 'albumId', type: 'uuid' })
  albumId: string | null;
  @ManyToOne(() => AlbumEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  album: AlbumEntity;
}
