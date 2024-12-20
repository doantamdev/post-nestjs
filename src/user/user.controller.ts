import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto ';
import { UserService } from './user.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private UserService: UserService) {}

  @Post()
  createUser(@Body() requestBody: CreateUserDto) {
    return this.UserService.create(requestBody);
  }

  @Get('/all')
  getAllUser() {
    return this.UserService.findAll();
  }

  @Get('/detail/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.findById(id);
  }

  @Put('/update/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() requestBody: UpdateUserDto,
  ) {
    return this.UserService.updateById(id, requestBody);
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.deleteById(id);
  }
}
