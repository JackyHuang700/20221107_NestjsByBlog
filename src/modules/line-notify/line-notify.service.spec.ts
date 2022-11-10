import { Test, TestingModule } from '@nestjs/testing';
import { LineNotifyService } from './line-notify.service';

describe('LineNotifyService', () => {
  let service: LineNotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineNotifyService],
    }).compile();

    service = module.get<LineNotifyService>(LineNotifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
