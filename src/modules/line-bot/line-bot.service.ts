import { Injectable } from '@nestjs/common';
import {
  ClientConfig,
  Client,
  TextMessage,
  MessageAPIResponseBase,
  TemplateMessage,
  StickerMessage,
  middleware,
  // TextMessage,
} from '@line/bot-sdk';
// import line from '@line/bot-sdk';
import { from, Observable } from 'rxjs';

@Injectable()
export class LineBotService {
  constructor() {}

  clientConfig: ClientConfig = {
    channelAccessToken:
      'ecUpda002462fpBGkT85PeiNa7DpmlfddEIgJj8CUnl0Il4dxq4r4uyYyocTUZ0gg1w2k3R+5eTeExsb9q6mu8QaBecNayHEc1wOLaowU/GFl5c+bIvpiTk3ZAfUprfHDtW7Mw8S0f9zNjaVDvgf8wdB04t89/1O/w1cDnyilFU=',
    channelSecret: '43fd927a58c4ff728e1bed6955ae8913',
  };
  client = new Client(this.clientConfig);
  groupId = '傳送到群組的id';

  //
  pushMessageToLineChannel(messageContent: {
    imageUrl: string;
    name: string;
    message: string;
    docPath: string;
  }): Observable<MessageAPIResponseBase> {
    const { imageUrl, name, message, docPath } = messageContent;
    const textMessage = `${name} 預約打卡囉`;
    const templateMessage: TemplateMessage = {
      type: 'template',
      altText: textMessage,
      template: {
        type: 'buttons',
        thumbnailImageUrl: imageUrl,
        imageAspectRatio: 'rectangle',
        imageSize: 'cover',
        imageBackgroundColor: '#FFFFFF',
        title: textMessage,
        text: `${message}`,
        actions: [
          {
            type: 'uri',
            label: `看看${name}的打卡`,
            uri: `https://challenage90days.web.app/checkin/${docPath}`,
          },
        ],
      },
    };
    return from(this.client.pushMessage(this.groupId, templateMessage));
  }

  //
  pushDayoffMessageToLineChannel({ name }): Observable<MessageAPIResponseBase> {
    // 貼圖訊息
    const stickerMessage: StickerMessage = {
      type: 'sticker',
      packageId: '6362',
      stickerId: '11087923',
    };
    //文字訊息
    const textMessage: TextMessage = {
      type: 'text',
      text: `${name} 請假囉`,
    };
    return from(this.client.pushMessage(this.groupId, textMessage));
  }

  //
  setMsg() {
    const client = new Client({
      // channelID: 65464, //填入在Line developers得到的channel ID
      channelSecret: '43fd927a58c4ff728e1bed6955ae8913',
      channelAccessToken:
        'ecUpda002462fpBGkT85PeiNa7DpmlfddEIgJj8CUnl0Il4dxq4r4uyYyocTUZ0gg1w2k3R+5eTeExsb9q6mu8QaBecNayHEc1wOLaowU/GFl5c+bIvpiTk3ZAfUprfHDtW7Mw8S0f9zNjaVDvgf8wdB04t89/1O/w1cDnyilFU=', //填入在Line developers得到的channelAccessToken
    });

    // Message
    const _msg: TextMessage = {
      type: 'text',
      text: 'Hello World',
    };
    client.replyMessage('@724fzpkf', _msg);
  }
}
