import { MiddlewareConsumer, Module, NestModule  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { HelloModule } from './modules/hello/hello.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/roles/roles.guard';

@Module({
  imports: [HelloModule],
  controllers: [AppController],
  providers: [ {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // 全域路由
  }
}
