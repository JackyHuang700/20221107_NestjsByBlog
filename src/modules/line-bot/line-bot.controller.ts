import { Controller, Get, Post, HttpCode } from '@nestjs/common';
import { LineBotService } from './line-bot.service';
import {
  Client, ClientConfig
} from '@line/bot-sdk';

@Controller('line-bot')
export class LineBotController {
  constructor(private readonly lineBotService: LineBotService) {}

  /**
   *
   */
  @Post('webhook')
  @HttpCode(200)
  pushMessageToLineChannel(req, res) {
    console.log('pushMessageToLineChannel: ');

    // return this.lineBotService.pushMessageToLineChannel({
    //   name: 'test',
    //   imageUrl: 'test',
    //   message: 'test',
    //   docPath: 'test',
    // });
    // this.lineBotService.setMsg()
    const clientConfig: ClientConfig = {
      channelAccessToken:
        'ecUpda002462fpBGkT85PeiNa7DpmlfddEIgJj8CUnl0Il4dxq4r4uyYyocTUZ0gg1w2k3R+5eTeExsb9q6mu8QaBecNayHEc1wOLaowU/GFl5c+bIvpiTk3ZAfUprfHDtW7Mw8S0f9zNjaVDvgf8wdB04t89/1O/w1cDnyilFU=',
      channelSecret: '43fd927a58c4ff728e1bed6955ae8913',

    };

    Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));

    const client = new Client(clientConfig);

    //
    function handleEvent(event) {
      if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
      }

      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
      });
    }
  }
}
