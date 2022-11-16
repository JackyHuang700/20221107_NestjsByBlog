import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule'


@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  /** 每分鐘的第45秒執行 */
  @Cron('* 10 * * * *')
  // @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug('Called when the second is 30');
  }


  @Interval(1000 * 1000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }
}
