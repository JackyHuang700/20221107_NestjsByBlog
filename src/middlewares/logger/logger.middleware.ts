import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express'; // 根據底層套用

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction  /**next: () => void */) {
    console.log('Logger Middleware Request!');
    next();
  }
}
