import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { fileFilter } from './helpers/fileFilter';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,

    private readonly configService: ConfigService,
  ) {}

  @Get('post/:imageName')
  findOneImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticImage(imageName);
    res.sendFile(path);
  }

  @Post('post')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,

      limits: {
        fieldSize: 1000, // limite del tamaño del archivo
      },
      storage: diskStorage({
        destination: './static/posts',
        filename: fileNamer,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Asegurate que el archivo sea una imagen');
    }

    const securUrl = `${this.configService.get('HOST_API')}/files/post/${file.filename}`;
    return {
      securUrl,
    };
  }
}
