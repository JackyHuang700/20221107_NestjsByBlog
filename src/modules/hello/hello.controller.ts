import {
  Controller,
  Get,
  Query,
  Headers,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  /** 查詢 */
  @Get()
  fetch(@Query() query, @Headers('token') token): string {
    console.log('token: ', token);
    const { id } = query as any;
    return this.helloService.fetch(id);
  }

  /** 建立 */
  @Post()
  save(@Body() body: Body): string {
    const { message } = body as any;
    return this.helloService.save(message);
  }

  /** 更新 */
  @Patch(':id')
  update(@Param() param, @Body() body): string {
    const { id } = param as any;

    const { message } = body as any;

    return this.helloService.update(id, message);
  }

  /** 刪除 */
  @Delete()
  remove(@Query() query): string {
    console.log('remove query: ', query);
    const { id } = query as any;

    return this.helloService.remove(id);
  }
}
