import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from './entities/user.entity';
import { InMemoryDb } from '../../db/db.service.db';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private db: InMemoryDb) {}

  async findAll(): Promise<UserEntity[]> {
    return this.db.users;
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = this.db.users.find(({ id: userId }) => userId === id);
    if (!user) throw new NotFoundException(`User with id:${id} is not exist`);
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const date = Date.now();
    const user = new UserEntity({
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    });
    this.db.users.push(user);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id:${id} is not exist`);
    if (updateUserDto.newPassword === updateUserDto.oldPassword)
      throw new ForbiddenException('You can not write the same password');
    if (user.password !== updateUserDto.oldPassword)
      throw new ForbiddenException('Wrong current password');
    user.version += 1;
    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    return user;
  }

  async delete(id: string): Promise<UserEntity> {
    const userIdx = this.db.users.findIndex((user) => user.id === id);
    if (userIdx === -1)
      throw new NotFoundException(`User with id:${id} is not exist`);
    const [deletedUser] = this.db.users.splice(userIdx, 1);
    return deletedUser;
  }
}
