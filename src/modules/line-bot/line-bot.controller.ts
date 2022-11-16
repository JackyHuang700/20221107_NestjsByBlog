import { Controller, Get, Post } from '@nestjs/common';
import { LineBotService } from './line-bot.service';

@Controller('line-bot')
export class LineBotController {
  constructor(private readonly lineBotService: LineBotService) {}

  /**
   *
   */
  @Post('webhook')
  pushMessageToLineChannel() {
    console.log('pushMessageToLineChannel: ');

    // return this.lineBotService.pushMessageToLineChannel({
    //   name: 'test',
    //   imageUrl: 'test',
    //   message: 'test',
    //   docPath: 'test',
    // });
    this.lineBotService.setMsg()
  }
}
