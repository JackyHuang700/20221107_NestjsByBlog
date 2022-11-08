import { Module } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { FileuploadController } from './fileupload.controller';

@Module({
  providers: [FileuploadService],
  controllers: [FileuploadController]
})
export class FileuploadModule {}
