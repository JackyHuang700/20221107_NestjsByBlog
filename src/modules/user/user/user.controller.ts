import { UserService } from './../user.service';
import { Controller, Get, Param } from '@nestjs/common';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** */
  @Get('getUser')
  getUserById(@Param() params) {
    console.log('params: ', params);
    const { id } = params;
    return this.userService.getUser(id as number);
    // return this.userService.getAllUser();
  }
}
