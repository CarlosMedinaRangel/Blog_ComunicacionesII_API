import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/auth.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { PostLike } from 'src/post-likes/entities/post-like.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Timestamp } from 'typeorm/driver/mongodb/bson.typings.js';
import { PostImage } from './post-image.entity';

@Entity(`POST`)
export class Post {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'Identificador único del post generado automáticamente (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'Cómo documentar APIs con NestJS',
    description: 'El título principal de la publicación',
  })
  @Column('text', { unique: true })
  title!: string;

  @ApiProperty({
    example: 'En este artículo aprenderemos a integrar Swagger...',
    description: 'El contenido detallado de la publicación',
  })
  @Column('text', { unique: false })
  Content!: string;

  @ApiProperty({
    example: 'Tecnología',
    description: 'Categoría a la que pertenece el post',
  })
  @Column('text', { unique: false })
  Category!: string;

  @ApiProperty({
    example: '2026-07-11T16:00:00Z',
    description: 'Fecha y hora exactas de la creación del post',
    type: Date,
  })
  @Column('timestamp')
  Create_At!: Timestamp;

  @ApiProperty({
    example: ['Tag1', 'Tag2', 'Tag3'],
    description: 'Lista de etiquetas (tags) asociadas al post',
    uniqueItems: true,
    isArray: true,
  })
  @Column('text', { array: true, default: [] })
  tags!: string[];

  //Relaciones

  @OneToMany(() => PostImage, (PostImage) => PostImage.Post, {
    cascade: true,
    eager: true,
  })
  images?: PostImage[];

  @ManyToOne(() => User, (user) => user.Post, { eager: true })
  user!: User;

  @OneToMany(() => Comment, (comment) => comment.post, { onDelete: 'RESTRICT' })
  comments!: Comment[];

  @OneToMany(() => PostLike, (Like) => Like.post)
  likes!: PostLike[];
}
