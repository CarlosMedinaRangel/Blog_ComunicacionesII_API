import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticImage(imageName: string) {
    const path = join(__dirname, '../../static/posts', imageName);

    if (!existsSync(path))
      throw new BadRequestException('No hay ninguna imagen con ese nombre');

    return path;
  }
}
