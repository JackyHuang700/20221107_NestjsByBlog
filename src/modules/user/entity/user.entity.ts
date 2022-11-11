import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{
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