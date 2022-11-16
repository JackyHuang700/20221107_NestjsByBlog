import { Test, TestingModule } from '@nestjs/testing';
import { LineBotController } from './line-bot.controller';

describe('LineBotController', () => {
  let controller: LineBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LineBotController],
    }).compile();

    controller = module.get<LineBotController>(LineBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
