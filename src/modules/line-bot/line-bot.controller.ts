import { Controller, Get, Post, HttpCode, Body } from '@nestjs/common';
import { LineBotService } from './line-bot.service';
import { Client, ClientConfig, MessageAPIResponseBase, TextMessage, WebhookEvent, WebhookRequestBody } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';

@Controller('line-bot')
export class LineBotController {
  constructor(private readonly lineBotService: LineBotService) {}

  @Post('hello')
  hello() {
    console.log('hello: ');
    return 'hello';
  }


  @Get('')
  @HttpCode(200)
  isOk() {
    console.log('isOk: ');
    return 'isOk';
  }


// @Post('webhook')
@Post()
async handler(@Body() req: WebhookRequestBody) {
  const events: WebhookEvent[] = req.events;
  events.map((event) => {
    if (event.type === 'message') {
      const returnMessage =
        event.message.type === 'text'
          ? event.message.text
          : 'テキストではありませんでした。';
      return new Client(clientConfig)
        .replyMessage(event.replyToken, {
          type: 'text',
          text: returnMessage,
        });
    }
  });
}


  /**
   *
   */
  @Post('webhookAsfsadf')
  async pushMessageToLineChannel(req: Request, res: Response) {
    console.log('res: ', res);
    console.log('req: ', req);
    // console.log('pushMessageToLineChannel: ');

    // return this.lineBotService.pushMessageToLineChannel({
    //   name: 'test',
    //   imageUrl: 'test',
    //   message: 'test',
    //   docPath: 'test',
    // });
    // this.lineBotService.setMsg()


    const events: WebhookEvent[] = req.body.events;

    // Process all of the received events asynchronously.
    const results = await Promise.all(
      events.map(async (event: WebhookEvent) => {
        try {
          await textEventHandler(event);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }

          // Return an error message.
          return res.status(500).json({
            status: 'error',
          });
        }
      })
    );

    // Return a successfull message.
    return res.status(200).json({
      status: 'success',
      results,
    });



    // Promise.all(req.body.events.map(handleEvent)).then((result) =>
    //   res.json(result),
    // );

    // const client = new Client(clientConfig);

    // //
    // function handleEvent(event) {
    //   if (event.type !== 'message' || event.message.type !== 'text') {
    //     return Promise.resolve(null);
    //   }

    //   return client.replyMessage(event.replyToken, {
    //     type: 'text',
    //     text: event.message.text,
    //   });
    // }
  }
}


const clientConfig: ClientConfig = {
  channelAccessToken:
    'ecUpda002462fpBGkT85PeiNa7DpmlfddEIgJj8CUnl0Il4dxq4r4uyYyocTUZ0gg1w2k3R+5eTeExsb9q6mu8QaBecNayHEc1wOLaowU/GFl5c+bIvpiTk3ZAfUprfHDtW7Mw8S0f9zNjaVDvgf8wdB04t89/1O/w1cDnyilFU=',
  channelSecret: '43fd927a58c4ff728e1bed6955ae8913',
};


const client = new Client(clientConfig);
const textEventHandler = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  // Process all message related variables here.
  const { replyToken } = event;
  const { text } = event.message;

  // Create a new message.
  const response: TextMessage = {
    type: 'text',
    text,
  };

  // Reply to the user.
  await client.replyMessage(replyToken, response);
};