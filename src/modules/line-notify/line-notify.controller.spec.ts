import { Test, TestingModule } from '@nestjs/testing';
import { LineNotifyController } from './line-notify.controller';

describe('LineNotifyController', () => {
  let controller: LineNotifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LineNotifyController],
    }).compile();

    controller = module.get<LineNotifyController>(LineNotifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
