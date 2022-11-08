import { Module } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { FileuploadController } from './fileupload.controller';
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage, DiskStorageOptions } from 'multer'
import { extname } from 'path'

@Module({
  imports: [
      /** 儲存檔案 */
      MulterModule.register({
        storage: diskStorage({
          // 路徑
          destination: 'uploads',
          filename: (req, file, cb) => {
            // 儲存檔案名稱
            const filename = `${Date.now()}${extname(file.originalname)}`;
            cb(null, filename);
          }
        } as DiskStorageOptions)
      }),
      /** end.儲存檔案 */
  ],
  providers: [FileuploadService],
  controllers: [FileuploadController]
})
export class FileuploadModule {}
