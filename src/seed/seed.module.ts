import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PostModule } from 'src/post/post.module';
import { AuthModule } from 'src/auth/auth.module';
import { CommentsModule } from 'src/comments/comments.module';
import { PostLikesModule } from 'src/post-likes/post-likes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    PostModule,
    ConfigModule,
    AuthModule,
    CommentsModule,
    PostLikesModule,
  ],
})
export class SeedModule {}
