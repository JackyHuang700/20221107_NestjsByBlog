import { CommonUtilityModule } from '../common-utility/common-utility.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

// entities
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user/user.controller';

@Module({
  imports: [CommonUtilityModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
