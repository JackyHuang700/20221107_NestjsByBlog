import {} from 'express';
import { LineNotifyService } from './line-notify.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('line-notify')
export class LineNotifyController {
  constructor(private readonly lineNotifyService: LineNotifyService) {}

  @Post('lineNotify')
  async lineNotify(@Body() body: ILineNotify) {
    return await this.lineNotifyService.setLineNotifyToken(body);
  }
}

/** */
export interface ILineNotify {
  /** */
  message: string;
}

export interface ILineNotifyResponse {
  /** */
  status: number;
/** */
  message: string;
}
