import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IErrorsTypeORM } from 'src/interfaces/error.response';

@Injectable()
export class CommonService {
  private readonly commonLogger = new Logger('CommonService');

  handleExceptions(error: IErrorsTypeORM, logger?: Logger): never {
    const activeLogger = logger ?? this.commonLogger;

    if (error.code === '23505') {
      throw new BadRequestException('¡Vaya! Ocurrio un error:', {
        cause: error.detail,
        description: `No necesitas crear este item porque ya existe uno con esa misma descripcion, mas informacion en: ${error.detail}`,
      });
    }

    if (error.code === '23503') {
      throw new BadRequestException('¡Vaya! Ocurrio un error:', {
        cause: error.detail,
        description: `No puedes borrar este item porque esta siendo utilizado, mas informacion en: ${error.detail}`,
      });
    }

    activeLogger.error(error);
    throw new InternalServerErrorException(
      'Ha ocurrido un error en el servidor, revisar el log',
    );
  }
}
