import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'node:crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id:${id} is not exist`);
    return user;
  }

  async create({ login, password }: CreateUserDto): Promise<UserEntity> {
    const hash = this.hashPassword(password);
    const newUser = await this.userRepo.create({ login, password: hash });
    const user = await this.userRepo.save(newUser);
    return user;
  }

  private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }
  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with id:${id} is not exist`);
    if (this.hashPassword(oldPassword) !== user.password)
      throw new ForbiddenException('Old password is wrong');
    if (oldPassword === newPassword)
      throw new ForbiddenException('You can not write the same password');

    const updateUser = await this.userRepo.update(id, {
      password: this.hashPassword(newPassword),
    });
    return await this.userRepo.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepo.delete(id);
    if (!user.affected)
      throw new NotFoundException(`User with id:${id} is not exist`);
    return;
  }
}
