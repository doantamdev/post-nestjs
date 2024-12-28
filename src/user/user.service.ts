import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/updateUser.dto ';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { Permission } from 'src/helpers/checkPermission.helper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(resquestBody: RegisterUserDto) {
    const user = this.userRepo.create(resquestBody);
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findById(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async updateById(id: number, requestBody: UpdateUserDto, currentUser: User) {
    if (requestBody.role) {
      throw new BadRequestException('You cannot change your role');
    }

    let user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User does not exits');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    Permission.check(id, currentUser);

    user = { ...user, ...requestBody };
    return this.userRepo.save(user);
  }

  async deleteById(id: number, currentUser: User) {
    let user = await this.findById(id);

    Permission.check(id, currentUser);

    if (!user) {
      throw new NotFoundException('User does not exits');
    }

    return this.userRepo.remove(user);
  }

  getCurrentUser(@Request() req) {
    return req.currentUser;
  }
}
