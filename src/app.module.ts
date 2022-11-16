import { GoogleSpreadsheetModule } from './modules/google-spreadsheet/google-spreadsheet.module';
import { ArticleModule } from './modules/article/article.module';
import { LineNotifyModule } from './modules/line-notify/line-notify.module';
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
import { CommonUtilityModule } from './modules/common-utility/common-utility.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';


// database
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { UserEntity } from './modules/user/entity/user.entity';
import { ArticleEntity } from './modules/article/entity/article.entity';

// mysql -hcontainers-us-west-34.railway.app -uroot -pfFlsxFmxXzG0G66pN15A --port 7382 --protocol=TCP railway
// mysql://root:fFlsxFmxXzG0G66pN15A@containers-us-west-34.railway.app:7382/railway
@Module({
  imports: [
    /** db */
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   // host: /**'localhost' */'',
    //   host: "containers-us-west-34.railway.app",
    //   port: 7382,
    //   username: 'root',
    //   password: 'fFlsxFmxXzG0G66pN15A',
    //   database: 'railway',
    //   entities: [UserEntity, ArticleEntity],
    //   synchronize: true, // 不應在生產中使用 設置- 否則您可能會丟失生產數據。
    // }),
    /** end.db */
    HelloModule,
    // MailModule,
    // /** 定時任務 */ScheduleModule.forRoot() ,
    // TasksModule, FileuploadModule,
    // CommonUtilityModule,
    // AuthModule,
    // UserModule,
    // LineNotifyModule,
    // ArticleModule,
    // GoogleSpreadsheetModule,
],
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
