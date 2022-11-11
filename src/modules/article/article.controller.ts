import { Controller, Get, Param } from '@nestjs/common';
import { get } from 'http';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {

  constructor(
    private readonly articleService: ArticleService,
  ) {}

  @Get("getAllArticle")
  getAllArticle(@Param() params){
    return this.articleService.findAll()
  }
}
