import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserEntity } from '../user/entities/user.entity';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log('signup-service');
    let user;
    try {
      user = await this.userService.create(createUserDto);
    } catch (e) {
      throw new BadRequestException({
        message: `User with login:${createUserDto.login} has already exist`,
      });
    }
    return user;
  }

  async signin(createUserDto: CreateUserDto) {
    const user = await this.userService.validateUser(createUserDto);
    return this.getToken(user);
  }

  async getToken({ id, login }: UserEntity) {
    const payload = { userId: id, login: login };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const { userId, login } = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          ignoreExpiration: false,
        },
      );
      const user = await this.userService.getUserByLogin(login);
      if (!user || user.id !== userId)
        throw new ForbiddenException({ message: `User is not exist` });
      return this.getToken(user);
    } catch (e) {
      throw new ForbiddenException({ message: 'Invalid RefreshToken' });
    }
  }
}
