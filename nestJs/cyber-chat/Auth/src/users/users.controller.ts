import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserResponseDto } from './dtos/userResponse.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @SerializeOptions({ type: UserResponseDto })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
}
