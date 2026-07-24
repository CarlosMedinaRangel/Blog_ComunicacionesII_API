import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  url!: string;

  @ManyToOne(() => Post, (Post) => Post.images, { onDelete: 'CASCADE' })
  Post!: Post;
}
