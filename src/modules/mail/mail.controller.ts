import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Controller('mail')
export class MailController {


  readonly _emailByA: string = 'jacky8595125@gmail.com';
  readonly _emailByB: string = 'rockroll520@hotmail.com';

  constructor(private mailService: MailerService) {}

  /**
   * http://localhost:3000/mail/plain-text-email?toemail=rockroll520@hotmail.com
   * @param toEmail
   * @returns
   */
  @Get('plain-text-email')
  async plainTextEmail(@Query('toemail') toEmail) {
    var response = await this.mailService.sendMail({
      // to: toEmail,
      to: this._emailByB, // 傳送對象
      from: this._emailByA,
      subject: 'Plain Text Email ✔',
      text: 'Welcome NestJS Email Sending Tutorial',
    });
    return response;
  }

  @Post('html-email')
  async postHTMLEmail(@Body() superHero: any) {
    var response = await this.mailService.sendMail({
      to: this._emailByB,
      from: this._emailByA,
      subject: 'HTML Dynamic Template',
      template: 'superhero',
      context: {
        superHero: superHero,
      },
    });
    return 'success';
  }

  /**
   * http://localhost:3000/mail/file-attachment?toemail=rockroll520@hotmail.com
   * @param toemail
   * @returns
   */
  @Get('file-attachment')
  async fileAttachement(@Query('toemail') toemail) {
    var response = await this.mailService.sendMail({
      // to: toEmail,
      to: this._emailByB, // 傳送對象
      from: this._emailByA,
      subject: 'File Attachment',
      // html: '<h1>File Attachment</h1>',
      template: './confirmation',
      context: {
        name: 'JK',
        url: 'www.google.com',
      },
      attachments: [
        {
          path: join(__dirname, 'templates', 'bike-1.webp'),
          filename: '1.webp',
          contentDisposition: 'attachment',
        },
      ],
    });
    return 'success';
  }
}
