import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CommonService } from 'src/common/common.service';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';
import { PostImage } from './entities/post-image.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PostController],
  providers: [PostService],

  imports: [
    TypeOrmModule.forFeature([Post, PostImage]),
    ConfigModule,
    CommonModule,
    AuthModule,
  ],
  exports: [TypeOrmModule, PostModule, PostService],
})
export class PostModule {}
