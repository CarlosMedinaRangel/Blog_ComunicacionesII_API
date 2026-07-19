import { Module } from '@nestjs/common';
import { PostLikesService } from './post-likes.service';
import { PostLikesController } from './post-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLike } from './entities/post-like.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from 'src/post/post.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [PostLikesController],
  providers: [PostLikesService],
  imports: [
    TypeOrmModule.forFeature([PostLike]),
    CommonModule,
    AuthModule,
    PostModule,
  ],
  exports: [TypeOrmModule, PostLikesModule, PostLikesService],
})
export class PostLikesModule {}
