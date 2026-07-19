// src/comments/entities/comment.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/auth/entities/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Tree,
  TreeChildren,
  TreeParent,
  RelationId,
  JoinColumn,
} from 'typeorm';

@Entity('comments')
@Tree('closure-table')
export class Comment {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ example: 'Excelente artículo!' })
  @Column('text')
  content!: string;

  @ApiProperty({ example: true })
  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  //Relaciones

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @RelationId((comment: Comment) => comment.post)
  postId!: string;

  @ManyToOne(() => User, (user) => user.comments, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @RelationId((comment: Comment) => comment.user)
  userId!: string;

  @TreeChildren({ cascade: true })
  replies!: Comment[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent!: Comment | null;

  @RelationId((comment: Comment) => comment.parent)
  parentId!: string | null;

  
}
