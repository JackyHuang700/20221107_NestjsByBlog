import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import { catchError, firstValueFrom } from 'rxjs';
import { ILineNotify, ILineNotifyResponse } from './line-notify.controller';

@Injectable()
export class LineNotifyService {
  constructor(private readonly httpService: HttpService) {}

  /** */
  async setLineNotifyToken(lineNotifyData: ILineNotify): Promise<ILineNotifyResponse> {
    return new Promise(async (resolve, reject) => {
      const _url = 'https://notify-api.line.me/api/notify';
      // const _token = '5jVcgJC9L37EOTCMYOwdLJNlzKr8GDCLXirtcm7ZIHE'; // key
      // const _token = 'YTfet25c8TUC2lvilqAxlDljCssZT8kYXIq6Bzmi20a'; // key
      const _token = this.getLineToken(enum_lineTokenUser.JK); // key

      // 使用 form-data 傳遞資料
      const form_data = new FormData();
      // form_data.append('message', '測試 lineNotify');
      form_data.append('message', lineNotifyData.message);

      const { data } = await firstValueFrom(
        this.httpService.post(_url, form_data, {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        }),
      );
      // console.log('data: ', data);

      resolve(data as ILineNotifyResponse);
    });
  }

  /** 取得 line token */
  getLineToken(_enum: enum_lineTokenUser): string {
    let _token = '';

    switch (_enum) {
      case enum_lineTokenUser.JK:
        {
          _token = '5jVcgJC9L37EOTCMYOwdLJNlzKr8GDCLXirtcm7ZIHE';
        }

        break;
      case enum_lineTokenUser.S:
        {
          _token = 'YTfet25c8TUC2lvilqAxlDljCssZT8kYXIq6Bzmi20a';
        }

        break;

      default:
        break;
    }

    return _token;
  }
}

/** */
enum enum_lineTokenUser {
  JK = 'JK',
  S = 'S',
}
