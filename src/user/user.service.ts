import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/updateUser.dto ';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { Permission } from 'src/helpers/checkPermission.helper';

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
    let user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User does not exits');
    }

    Permission.check(id, currentUser);

    user = { ...user, ...requestBody };
    return this.userRepo.save(user);
  }

  async deleteById(id: number) {
    let user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User does not exits');
    }

    return this.userRepo.remove(user);
  }

  getCurrentUser(@Request() req) {
    return req.currentUser;
  }
}
