import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto ';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(resquestBody: CreateUserDto) {
    const user = this.userRepo.create(resquestBody);
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findById(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async updateById(id: number, requestBody: UpdateUserDto) {
    let user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User does not exits');
    }

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
}
