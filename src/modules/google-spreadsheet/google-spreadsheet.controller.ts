import { Controller, Get } from '@nestjs/common';
import { GoogleSpreadsheetService } from './google-spreadsheet.service';

@Controller('google-spreadsheet')
export class GoogleSpreadsheetController {
  constructor(
    private readonly googleSpreadsheetService: GoogleSpreadsheetService,
  ) {}


  /**
   * https://docs.google.com/spreadsheets/d/1lV7jAuB_Es3o9ZNDwgH9vyYmsctEsDH5qjjL4Wi0ZCQ/edit#gid=0
   * @returns
   */
  @Get('showInfo')
  async showInfo() {
    return await this.googleSpreadsheetService.showInfo();
  }
}
