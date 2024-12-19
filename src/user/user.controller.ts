import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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

  @Put('/update/:id')
  updateUser(@Param('id') id: number, @Body() requestBody: any) {
    return this.UserService.updateById(id, requestBody);
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: number) {
    return this.UserService.deleteById(id);
  }
}
