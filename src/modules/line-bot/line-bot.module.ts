import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LineBotController } from './line-bot.controller';
import { LineBotService } from './line-bot.service';
import {
  middleware,
  MiddlewareConfig,
} from '@line/bot-sdk';

const clientConfig: MiddlewareConfig = {
  channelAccessToken:
    'ecUpda002462fpBGkT85PeiNa7DpmlfddEIgJj8CUnl0Il4dxq4r4uyYyocTUZ0gg1w2k3R+5eTeExsb9q6mu8QaBecNayHEc1wOLaowU/GFl5c+bIvpiTk3ZAfUprfHDtW7Mw8S0f9zNjaVDvgf8wdB04t89/1O/w1cDnyilFU=',
  channelSecret: '43fd927a58c4ff728e1bed6955ae8913',

};

@Module({
  controllers: [LineBotController],
  providers: [LineBotService]
})
export class LineBotModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {


    consumer
    .apply(middleware(clientConfig))
    .forRoutes(LineBotController);
  }

}
