import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { join } from 'path';


// const fs = require("fs");

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /** 註冊 */
  @Post('/signup')
  signup(@Body() user: CreateUserDto) {
    console.log('/auth/signup: ', user);
    return this.userService.createUser(user);
  }

  /** 登入
   * 會到 auth.service.ts  validateUser function 去驗證
   {
    "username":"jacky8595125@gmail.com",
    "password":"jk123456"
}
   */
  @UseGuards(LocalAuthGuard) // 驗證標籤
  @Post('/signin')
  async signin(@Req() request: Request) {
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
      {
    "username":"jacky8595125@gmail.com",
    "password":"jk123456"
}
   */
  @UseGuards(LocalAuthGuard) // 驗證標籤
  //  @UseGuards(AuthGuard('local')) // 驗證標籤
  @Post('/signinByJwt')
  signinByJwt(@Req() request: Request) {
    // return request.user;

    /**
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphY2t5ODU5NTEyNUBnbWFpbC5jb20iLCJpYXQiOjE2Njc5OTIwNjQsImV4cCI6MTY2Nzk5MjEyNH0.ZobWJYNjSA9X5SNphIA_H-kabJbxnqp3JlUQhdvMVKA"
}
    */
    return this.authService.generateJwt(request.user);
  }

  /** jwt驗證登入
   * 需要先執行 auth/signinByJwt 進行登入，取得 access_token 後，再執行此 api(記得登記最新的token)
   * 期限 1 分鐘
   * 一分鐘過後會登出，並且拿到
   {
    "statusCode": 401,
    "message": "Unauthorized"
}
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  /** downloadUserData */
  @Get('downloadUserData')
  async downloadUserData() {

    return await this.authService.getPPTData()

    // const users: any = [
    //   {
    //     email: 'JK',
    //     username: 'jacky8595125@gmail.com',
    //     password: {
    //       hash: 'cc2aa80aaf544d812fa637682d189d572851ebe080efab32ce29fb78edaa1db7d5f760248cc269cca68c54a39754ab0fc1187fca5b067b708b752d85fca0e898',
    //       salt: 'ea506553571613723c3e1051b78dca70',
    //     },
    //   },
    // ];
    // await fs.writeFileSync(join(process.cwd(), 'db', 'users.json'), JSON.stringify(users));
    // fs.writeFileSync(/**join(process.cwd(), 'db', 'users.json') */join(process.cwd()+'/db'+ '/users.json') , JSON.stringify(users));
    // const _data = this.getData()

  }
}
