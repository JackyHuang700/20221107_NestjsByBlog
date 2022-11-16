import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 預設根路徑
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
