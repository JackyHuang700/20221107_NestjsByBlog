import { Module } from '@nestjs/common';
import { LineBotController } from './line-bot.controller';
import { LineBotService } from './line-bot.service';

@Module({
  controllers: [LineBotController],
  providers: [LineBotService]
})
export class LineBotModule {}
