import { UserService } from './user.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post()
  createUser(@Body() requestBody: any) {
    return this.UserService.create(requestBody);
  }

  @Get('/all')
  getAllUser() {
    return this.UserService.findAll();
  }

  @Get('/detail/:id')
  getUserById(@Param('id') id: number) {
    return this.UserService.findById(id);
  }
}
