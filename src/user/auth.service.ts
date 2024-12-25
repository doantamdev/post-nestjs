import { RegisterUserDto } from './dtos/registerUser.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dtos/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(newUser: RegisterUserDto) {
    const userByEmail = await this.userService.findByEmail(newUser.email);

    if (userByEmail) {
      throw new BadRequestException('Email already exist');
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    const savedUser = await this.userService.create(newUser);

    const payload = {
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      role: savedUser.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {
      message: 'Register user successfully',
      accessToken,
    };
  }

  async login(userLogin: LoginUserDto) {
    const userByEmail = await this.userService.findByEmail(userLogin.email);

    if (!userByEmail) {
      throw new BadRequestException('Can not find the email');
    }

    const isMatchPassword = await bcrypt.compare(
      userLogin.password,
      userByEmail.password,
    );

    if (!isMatchPassword) {
      throw new BadRequestException('Wrong password');
    }

    const payload = {
      id: userByEmail.id,
      username: userByEmail.username,
      email: userByEmail.email,
      role: userByEmail.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {
      message: 'Login user successfully',
      accessToken,
    };
  }
}
