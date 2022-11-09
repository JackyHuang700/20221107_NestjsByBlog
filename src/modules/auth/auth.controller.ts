import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  /** 註冊 */
  @Post('/signup')
  signup(@Body() user: CreateUserDto) {
    console.log('/auth/signup: ', user);
    return this.userService.createUser(user);
  }

  /** 登入
   * 會到 auth.service.ts  validateUser function 去驗證
   */
  @UseGuards(AuthGuard('local')) // 驗證標籤
  @Post('/signin')
  signin(@Req() request: Request){
    // return request.user;


    /**
     {
    "username": "jacky8595125@gmail.com",
    "email": "JK"
}
     */
    return request.user;
  }


/** 登入 by jwt
   * 會到 auth.service.ts  validateUser function 去驗證
   */
 @UseGuards(LocalAuthGuard) // 驗證標籤
 @Post('/signinByJwt')
 signinByJwt(@Req() request: Request){
   // return request.user;


   /**
    {
   "username": "jacky8595125@gmail.com",
   "email": "JK"
}
    */
   return request.user;
 }


}
