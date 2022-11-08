// import { Controller } from '@nestjs/common';
import {
  Body,
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { SampleDto } from './dto//sample.dto';


@Controller('fileupload')
export class FileuploadController {

  constructor( ){}

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


  /** */
  @UseInterceptors(FileInterceptor('file'))
  @Post('file/fail-validation')
  uploadFileAndFailValidation(
    @Body() body: SampleDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {

console.log('file/fail-validation', file)

    return {
      body,
      file: file.buffer.toString(),
    };
  }

}
