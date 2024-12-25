import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      //get token
      const token = request.headers.authorization.split(' ')[1];

      if (!token) {
        throw new ForbiddenException('Can not find the Token');
      }
      //validate token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      //find user by token
      const user = await this.userService.findByEmail(payload.email);
      if (!user) {
        throw new BadRequestException('Some thing went wrong');
      }
      //assign user to request
      request.currentUser = user;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}
