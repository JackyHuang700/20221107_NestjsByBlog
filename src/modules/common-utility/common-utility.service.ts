import { Injectable } from '@nestjs/common';
import { randomBytes, pbkdf2Sync } from 'crypto';

@Injectable()
export class CommonUtilityService {

  /** 鹽加密
   * https://ithelp.ithome.com.tw/articles/10279148
   # 文章搜尋 鹽加密
   */
  /**public static */ encryptBySalt(
    input: string,
    salt = randomBytes(16).toString('hex'),
  ) {
    const hash = pbkdf2Sync(input, salt, 1000, 64, 'sha256').toString('hex');
    return { hash, salt };
  }
}
