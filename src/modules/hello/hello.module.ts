import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HelloMiddleware } from 'src/middlewares/hello/hello.middleware';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

@Module({
  controllers: [HelloController],
  providers: [HelloService]
})
export class HelloModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HelloMiddleware /**, LoggerMiddleware */).forRoutes(HelloController)
  }
}
