import { UserEntity } from './../../user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('article')
export class ArticleEntity{

  @PrimaryGeneratedColumn()
  id: number;


  // @Column()
  @JoinColumn({
    name: 'uid',
  })
  @ManyToOne(type => UserEntity, user => user.id)

  user: UserEntity;

  // @Column()
  // @OneToMany(() => User, user => user.id)
  // @RelationId((article: Article) => article.uid)
  // @Column()
  // @ManyToOne(() => User, user => user.id)
  // uid: number;

  @Column({
    length: 100
  })
  title: string;

  @Column({
    length: 200
  })
  content: string;

  @Column({
    nullable: true
  })
  createdAt: string;

  @Column({
    nullable: true
  })
  updatedAt: string;

  @Column({
    nullable: true
  })
  deletedAt: string;

}

// drop table article
// SHOW CREATE TABLE article
// alter table article drop uid


// ALTER TABLE `railway`.`article`
// DROP COLUMN `uid`;
