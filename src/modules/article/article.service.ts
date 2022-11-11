import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entity/article.entity';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article)
    private usersRepository: Repository<Article>,
  ) {}


  async findAll(): Promise<Article[]> {
    return await this.usersRepository.find();
  }

}
