import { Article } from 'src/modules/article/entity/article.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User{

  @OneToMany(() => Article, article => article.uid)
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
}