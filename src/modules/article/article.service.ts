import { UserEntity } from './../user/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './entity/article.entity';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,

    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}


  async findAll(): Promise<ArticleEntity[]> {
    return await this.articleRepository.find({
      relations: ['user'],
    });
  }

 /** 新增文章 */
 async setAddArticle(data: Pick<ArticleEntity, "title"|"content">): Promise<number>{

  const _userId = 2 // 使用者id
  const _user = await this.usersRepository.findOneBy({ id: _userId })
  console.log('_user: ', _user);

  // 建立文章
  const _article = await this.articleRepository.create({
    title: data.title ? data.title : '文章標題',
    content: data.content ? data.content : '文章內容',
    user: _user,
    // createdAt: new Date().toISOString(),
    // updatedAt: new Date().toISOString(),
    // deletedAt: new Date().toISOString(),
  })


  const {id: _id} = await this.articleRepository.save(_article)

  return Promise.resolve(_id)
}


}
