import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';

/**
 * 排成任務
 */
@Module({
  providers: [TasksService]
})
export class TasksModule {}
