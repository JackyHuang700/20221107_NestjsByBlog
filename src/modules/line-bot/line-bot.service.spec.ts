import { Test, TestingModule } from '@nestjs/testing';
import { LineBotService } from './line-bot.service';

describe('LineBotService', () => {
  let service: LineBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineBotService],
    }).compile();

    service = module.get<LineBotService>(LineBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
