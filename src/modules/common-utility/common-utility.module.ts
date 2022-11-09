import { Module } from '@nestjs/common';
import { CommonUtilityService } from './common-utility.service';

@Module({
  providers: [CommonUtilityService],
  exports: [CommonUtilityService],
})
export class CommonUtilityModule {}
