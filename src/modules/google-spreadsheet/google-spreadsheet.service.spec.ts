import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSpreadsheetService } from './google-spreadsheet.service';

describe('GoogleSpreadsheetService', () => {
  let service: GoogleSpreadsheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleSpreadsheetService],
    }).compile();

    service = module.get<GoogleSpreadsheetService>(GoogleSpreadsheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
