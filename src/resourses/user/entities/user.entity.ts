import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', type: 'varchar' })
  login: string;
  @Column({ name: 'password', type: 'varchar' })
  @Exclude()
  password: string;
  @VersionColumn({ name: 'version', type: 'int' })
  version: number;
  @CreateDateColumn({ name: 'create', type: 'timestamp' })
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;
  @UpdateDateColumn({ name: 'update', type: 'timestamp' })
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;

}
