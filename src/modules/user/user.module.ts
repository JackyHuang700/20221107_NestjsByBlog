import { CommonUtilityModule } from '../common-utility/common-utility.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [CommonUtilityModule],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
