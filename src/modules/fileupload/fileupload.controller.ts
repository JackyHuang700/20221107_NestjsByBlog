// import { Controller } from '@nestjs/common';
import {
  Body,
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { SampleDto } from './dto//sample.dto';

@Controller('fileupload')
export class FileuploadController {
  constructor() {}

  /** */
  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    @Body() body: SampleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('body: ', body);
    console.log('file: ', file);

    return {
      body,
      file: file.buffer.toString(),
    };
  }

  /**  */
  @UseInterceptors(FileInterceptor('file'))
  @Post('file/pass-validation')
  uploadFileAndPassValidation(
    @Body() body: SampleDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'json',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return {
      body,
      file: file?.buffer.toString(),
    };
  }

  /** 單一欄位之多個檔案上傳 */
  @UseInterceptors(FilesInterceptor('files'))
  @Post('file/fail-validation')
  uploadFileAndFailValidation(@Body() body: SampleDto,
    @UploadedFiles(
      // 這段會錯誤，可關閉
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .build(),
    )
    files: Express.Multer.File[],
  ) {
    // console.log('file/fail-validation', files);

    return {
      body,
      files, /**file.buffer */
      originalname: files.map(({ fieldname, originalname, filename }) => ({
        fieldname,
        originalname,

        file: {
          url: `http://localhost:3000/uploads/${filename}`, // 回傳經泰路徑，讓前端可以訪問
        }
      })),
    };
  }
}
