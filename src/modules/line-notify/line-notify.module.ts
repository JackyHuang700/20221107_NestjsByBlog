import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LineNotifyService } from './line-notify.service';
import { LineNotifyController } from './line-notify.controller';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [LineNotifyService],
  controllers: [LineNotifyController]
})
export class LineNotifyModule {}
