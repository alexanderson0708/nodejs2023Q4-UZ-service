import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const header = req.header.authorization;
      const [bearer, token] = header.split(' ');
      if (bearer !== 'Bearer') throw new UnauthorizedException();
      this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'User is NOT authorized' });
    }
  }
}
