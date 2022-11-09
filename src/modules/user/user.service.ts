import { Injectable } from '@nestjs/common';
import { Interface } from 'readline';
import { CommonUtilityService } from '../common-utility/common-utility.service';
import { CreateUserDto } from './dto/create-user.dto';

export interface IAaa{
    username: string;
    email: string;
    password: {
      hash: string;
      salt: string;
    }
}

@Injectable()
export class UserService {
  private readonly _userDB = [
    {
      email: 'JK',
      username: 'jacky8595125@gmail.com',
      password: {
        "hash": "cc2aa80aaf544d812fa637682d189d572851ebe080efab32ce29fb78edaa1db7d5f760248cc269cca68c54a39754ab0fc1187fca5b067b708b752d85fca0e898",
        "salt": "ea506553571613723c3e1051b78dca70"
    }
    },
    {
      email: 'AA',
      username: 'AA@gmail.com',
      password: {
        "hash": "4e00abf61c3c0bb87874410f70e1013b4cc20ad9a5cc504221888d85ee30601f3667d8baaf7b96b282d322850a23f5613275224e4be2e115d2e04facdbf80293",
        "salt": "21069c73176af1210a29403c041cad87"
      },
    },
    {
      email: 'BB',
      username: 'BB@gmail.com',
      password: {
        "hash": "bf8afe202f631b01ba20cf5e7ccb8235a4e1c11e040e0865446a115bdfd389ead99c72b561a03b09f131113664694ecc5cd844f9f5b401924994ae9c1f9116e1",
        "salt": "4addb325f2fff958482d80472dff2d1a"
      },
    },
  ] as IAaa[]


  constructor(private readonly commonUtilityService: CommonUtilityService) {}

  /** */
  createUser(user: CreateUserDto) {
    const { username, email } = user;
    const password = this.commonUtilityService.encryptBySalt(user.password);
    // console.log('ok')
    return {
      username,
      email,
      password,
    };
  }

  /** 搜尋使用者 */
  findUser(username: CreateUserDto['username']): Promise<IAaa> {
    return new Promise((resolve/**, reject */) => {
      setTimeout(() => {
        resolve(this._userDB.find((c) => c.username === username))
      }, 1500);
    });
  }
}


