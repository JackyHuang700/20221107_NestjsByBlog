import { Module } from '@nestjs/common';
import { GoogleSpreadsheetController } from './google-spreadsheet.controller';
import { GoogleSpreadsheetService } from './google-spreadsheet.service';

@Module({
  controllers: [GoogleSpreadsheetController],
  providers: [GoogleSpreadsheetService]
})
export class GoogleSpreadsheetModule {}
