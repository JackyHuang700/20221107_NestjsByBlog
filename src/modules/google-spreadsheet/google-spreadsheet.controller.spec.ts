import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSpreadsheetController } from './google-spreadsheet.controller';

describe('GoogleSpreadsheetController', () => {
  let controller: GoogleSpreadsheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleSpreadsheetController],
    }).compile();

    controller = module.get<GoogleSpreadsheetController>(GoogleSpreadsheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
