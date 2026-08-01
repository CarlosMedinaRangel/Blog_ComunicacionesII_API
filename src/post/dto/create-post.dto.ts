import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'El título principal de la publicación',
    example: 'El mejor libro de terror es',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title!: string;

  @ApiProperty({
    description: 'El cuerpo o contenido de la publicación',
    example:
      'El resplandor (título original: The Shining) es una película británico-estadounidense de 1980 del subgénero de terror psicológico,...',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  Content!: string;

  @IsString()
  @MinLength(1)
  Content2!: string;
  
  @IsString()
  @MinLength(1)
  Content3!: string;

  @ApiProperty({
    description: 'La categoría principal a la que pertenece el post',
    example: 'Libros',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  Category!: string;

  @ApiProperty({
    description:
      'Lista de etiquetas (tags) para facilitar la búsqueda del post',
    example: ['1', '2', '3'],
    isArray: true, // Le indica explícitamente a Swagger que esto es una lista
  })
  @IsString({ each: true })
  @IsArray()
  tags!: string[];

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
