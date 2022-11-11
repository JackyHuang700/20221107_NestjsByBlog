import { User } from './../../user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Article{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @OneToMany(() => User, user => user.id)
  uid: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column()
  deletedAt: string;

}

// drop table article
// SHOW CREATE TABLE article
// alter table article drop uidId