import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleEntity } from './entity/article.entity';

@Controller('article')
export class ArticleController {

  constructor(
    private readonly articleService: ArticleService,
  ) {}

  @Get("getAllArticle")
  getAllArticle(@Param() params){
    return this.articleService.findAll()
  }

  /** 新增文章 */
  @Post("setAddArticle")
  async setAddArticle(@Body() body: Pick<ArticleEntity, "title"|"content">){
    console.log('body: ', body);
    return await this.articleService.setAddArticle(body)
  }

}
