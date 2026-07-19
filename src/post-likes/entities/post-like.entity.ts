import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/auth.entity';
import { ReactionType } from 'src/interfaces/reactionTypes';
import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  Unique,
} from 'typeorm';

@Entity('post_likes')
@Unique(['user', 'post'])
export class PostLike {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'Identificador único de la reacción (UUID).',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    enum: ReactionType,
    example: ReactionType.LIKE,
    description: 'Tipo de reacción realizada por el usuario sobre el post.',
  })
  @Column({
    type: 'enum',
    enum: ReactionType,
  })
  reaction!: ReactionType;

  @ApiProperty({
    example: '2026-07-19T15:45:00.000Z',
    description: 'Fecha y hora en que se registró la reacción.',
    type: Date,
  })
  @CreateDateColumn()
  createdAt!: Date;

  // ===========================
  // Relaciones
  // ===========================

  @ApiProperty({
    type: () => Post,
    description: 'Post al que pertenece la reacción.',
  })
  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'UUID del post relacionado.',
  })
  @RelationId((like: PostLike) => like.post)
  postId!: string;

  @ApiProperty({
    type: () => User,
    description: 'Usuario que realizó la reacción.',
  })
  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ApiProperty({
    example: 'b1c76c62-0d85-4f8d-9d56-7a3c5f0f9c13',
    description: 'UUID del usuario que realizó la reacción.',
  })
  @RelationId((like: PostLike) => like.user)
  userId!: string;
}
