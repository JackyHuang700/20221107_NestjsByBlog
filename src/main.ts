import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

/** swagger */
setupSwagger(app)
/** end.swagger */

  await app.listen(3000);
}
bootstrap();


/** 安裝swagger */
function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const _swaggerOptions = builder
    .setTitle('api document')
    .setDescription('This is a basic Swagger document.')
    .setVersion('1.0')
    // .addBearerAuth() // 添加權限
    .build();
  const document = SwaggerModule.createDocument(app, _swaggerOptions);
  SwaggerModule.setup('api', app, document);
}