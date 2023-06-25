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
import * as bcrypt from 'bcrypt';
import * as process from 'process';
import { compare } from 'bcrypt';

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
    if (!user)
      throw new NotFoundException(`User with id:${id} doesn't not exist`);
    return user;
  }

  async create({ login, password }: CreateUserDto): Promise<UserEntity> {
    const hash = await this.hashPassword(password);
    if (!hash) throw new Error();
    const newUser = await this.userRepo.create({ login, password: hash });
    const user = await this.userRepo.save(newUser);
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, +process.env.CRYPT_SALT);
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user)
      throw new NotFoundException(`User with id:${id} doesn't not exist`);
    const match = await compare(oldPassword, user.password);
    if (!match) throw new ForbiddenException('Old password is wrong');
    if (oldPassword === newPassword)
      throw new ForbiddenException('You can not write the same password');

    await this.userRepo.update(id, {
      password: await this.hashPassword(newPassword),
    });
    return await this.userRepo.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepo.delete(id);
    if (!user.affected)
      throw new NotFoundException(`User with id:${id} is not exist`);
    return;
  }

  async validateUser({ login, password }: CreateUserDto) {
    const user = await this.userRepo.findOneBy({ login });
    if (!user)
      throw new ForbiddenException({
        message: `User with login: ${login} is not exist`,
      });
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      throw new ForbiddenException({
        message: `User password: ${password} is incorrect`,
      });
    return user;
  }
  async getUserByLogin(login: string) {
    return await this.userRepo.findOneBy({ login });
  }
}
