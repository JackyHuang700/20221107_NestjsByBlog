import { ArticleEntity } from 'src/modules/article/entity/article.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity{

  // @OneToMany(() => Article, article => article.uid)
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
      // default: '',
    })
    nickname: string;

    @Column()
    pwd: string;

    @Column({ default: false })
    isActive: boolean;

    @Column()
    createdAt: string;

    @Column()
    updatedAt: string;

    @Column()
    deletedAt: string;

  @OneToMany(type => ArticleEntity, c => c.user)
    article: ArticleEntity[];
}