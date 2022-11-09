import { Test, TestingModule } from '@nestjs/testing';
import { CommonUtilityService } from './common-utility.service';

describe('CommonUtilityService', () => {
  let service: CommonUtilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonUtilityService],
    }).compile();

    service = module.get<CommonUtilityService>(CommonUtilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
