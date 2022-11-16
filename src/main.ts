import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RolesGuard } from './modules/roles/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** swagger */
  setupSwagger(app);
  /** end.swagger */

  /** 開啟首衛 */
  app.useGlobalGuards(new RolesGuard());
  /** ned.開啟首衛 */

  /** CORS */
  app.enableCors()
  /** end.CORS */

  await app.listen(process.env.PORT || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

/** 安裝swagger */
function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const _config = builder
    .setTitle('api document')
    .setDescription('This is a basic Swagger document.')
    .setVersion('1.0')
    // .addBearerAuth() // 添加權限
    .build();
  const document = SwaggerModule.createDocument(app, _config);
  const _options: SwaggerCustomOptions = {
    // explorer: true, // 開啟搜尋列
  };
  SwaggerModule.setup('api', app, document, _options); // 開啟葉面路徑
}
