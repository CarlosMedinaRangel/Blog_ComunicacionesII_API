import {
  IsBoolean,
  IsOptional,
  isString,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsOptional()
  @IsString()
  parentId?: string;

  @IsString()
  @MinLength(1)
  content!: string;

  @IsOptional()
  @IsBoolean()
  isActive!: boolean;
}
