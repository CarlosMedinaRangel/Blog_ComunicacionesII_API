import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/auth.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from 'typeorm/driver/mongodb/bson.typings.js';

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

  @ManyToOne(() => User, (user) => user.Post, { eager: true })
  user!: User;
}
