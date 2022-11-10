import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CommonUtilityService } from '../common-utility/common-utility.service';
import { UserService } from '../user/user.service';
import { writeFile, mkdirSync, existsSync } from 'fs';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  constructor(
    private readonly userService: UserService,
    private readonly commonUtilityService: CommonUtilityService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

/**
 * onApplicationBootstrap() 會在所有 modules 都被初始化後執行
 */
  async onApplicationBootstrap() {
    const tse = await this.fetchListedStocks({ market: 'TSE' });
    console.log(tse);   // 顯示上市公司股票清單

    const otc = await this.fetchListedStocks({ market: 'OTC' });
    console.log(otc);   // 顯示上櫃公司股票清單
  }

  /** 驗證使用者
 # search 使用 AuthGuard
 passport 會將 LocalStrategy 中 validate 方法回傳的值寫入 請求物件 的 user 屬性中
 */
  async validateUser(username: string, password: string) {
    const _user = await this.userService.findUser(username);
    const { hash } = this.commonUtilityService.encryptBySalt(
      password,
      _user?.password?.salt,
    );

    if (!_user || hash !== _user?.password?.hash) {
      return null;
    }
    return _user;
  }

  /** 處理JWT */
  generateJwt(user: any) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /** 抓取新聞 */
  async getPPTData(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const _getDataurl: string = 'https://www.ptt.cc/bbs/Stock/index.html';
      const _data2 = await firstValueFrom(this.httpService.get(_getDataurl));

      // 轉換為 Big-5 編碼
      const data = [];
      const $ = cheerio.load(iconv.decode(_data2.data, 'big5'), null, false); // 載入 body
      // console.log('$: ', $.html());

      const list = $('.r-list-container .r-ent');

      for (let i = 0; i < list.length; i++) {
        const title = list.eq(i).find('.title a').text();
        const author = list.eq(i).find('.meta .author').text();

        const date = list.eq(i).find('.meta .date').text();
        const link = list.eq(i).find('.title a').attr('href');

        data.push({ title, author, date, link });
      }

      // 寫入檔案
      const _str = __dirname + '../../../../uploads/files';
      const _isRunMkdir = await existsSync(_str);
      if (!_isRunMkdir) await mkdirSync(_str);
      writeFile(
        _str + '/users.json',
        JSON.stringify(JSON.stringify(data), null, 2),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        },
      );
      // end.寫入檔案

      resolve(true);
    });
  }


/**
 * 數據即財富：股市資料來源與取得
 * refer: https://ithelp.ithome.com.tw/articles/10287328?sc=iThelpR
 */
  async fetchListedStocks(options?: { market: 'TSE' | 'OTC' }): Promise<boolean> {
    return new Promise(async (resolve, reject) => {

      const url = options?.market === 'OTC'
      ? 'https://isin.twse.com.tw/isin/class_main.jsp?market=2&issuetype=4'
      : 'https://isin.twse.com.tw/isin/class_main.jsp?market=1&issuetype=1';

    // 取得 HTML 並轉換為 Big-5 編碼
    const page = await firstValueFrom(this.httpService.get(url, { responseType: 'arraybuffer' }))
      .then(response => iconv.decode(response.data, 'big5'));

    // 使用 cheerio 載入 HTML 以取得表格的 table rows
    const $ = cheerio.load(page);
    const rows = $('.h4 tr');

    // 遍歷每個 table row 並將其轉換成我們想要的資料格式
    const data = rows.slice(1).map((i, el) => {
      const td = $(el).find('td');
      return {
        symbol: td.eq(2).text().trim(),   // 股票代碼
        name: td.eq(3).text().trim(),     // 股票名稱
        market: td.eq(4).text().trim(),   // 市場別
        industry: td.eq(6).text().trim(), // 產業別
      };
    }).toArray();

    // return data;
// 寫入檔案
const _str = __dirname + '../../../../uploads/files';
const _isRunMkdir = await existsSync(_str);
if (!_isRunMkdir) await mkdirSync(_str);
writeFile(
  _str + '/fetchListedStocks.json',
  JSON.stringify(JSON.stringify(data), null, 2),
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
  },
);
// end.寫入檔案



      resolve(true)
    })
  }

}
