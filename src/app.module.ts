import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/roles/roles.guard';

// Module
import { HelloModule } from './modules/hello/hello.module';
import { MailModule } from './modules/mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { FileuploadModule } from './modules/fileupload/fileupload.module';

@Module({
  imports: [HelloModule, MailModule, /** 定時任務 */ScheduleModule.forRoot() , TasksModule, FileuploadModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // 全域路由
  }
}
