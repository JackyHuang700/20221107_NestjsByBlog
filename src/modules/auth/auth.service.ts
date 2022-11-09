import { Injectable } from '@nestjs/common';
import { CommonUtilityService } from '../common-utility/common-utility.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly commonUtilityService: CommonUtilityService,
  ) {}

/** 驗證使用者
 # search 使用 AuthGuard
 passport 會將 LocalStrategy 中 validate 方法回傳的值寫入 請求物件 的 user 屬性中
 */
async validateUser(username: string, password: string) {

  const _user = await this.userService.findUser(username)
  const { hash } = this.commonUtilityService.encryptBySalt(password, _user?.password?.salt);

  if (!_user || hash !== _user?.password?.hash) {
    return null;
  }
  return _user;
}

}
