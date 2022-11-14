import { Controller, Get } from '@nestjs/common';
import { GoogleSpreadsheetService } from './google-spreadsheet.service';

@Controller('google-spreadsheet')
export class GoogleSpreadsheetController {

  constructor(
    private readonly googleSpreadsheetService: GoogleSpreadsheetService,
  ){}

    @Get('showInfo')
    async showInfo(){
      return await this.googleSpreadsheetService.showInfo()
    }

}
