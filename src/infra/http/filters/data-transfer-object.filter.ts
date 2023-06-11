import { DtoAdapter } from '../../../domain/adapters/dto-adapter';
import { IPathsDto } from '../../../domain/interfaces/filters.interfaces';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

function DTOFilter<T extends DtoAdapter>(Dto: new () => T, path: IPathsDto) {
  return async (req: Request, res, next) => {
    try {
      const body = req?.body;
      const param = req?.params;
      const query = req?.query;

      let request: DtoAdapter;
      switch (path) {
        case 'BODY':
          request = plainToClass(Dto, body);
          break;
        case 'PARAMS':
          request = plainToClass(Dto, param);
          break;
        case 'QUERY':
          request = plainToClass(Dto, query);
          break;
      }
      await request.isValid();

      return next();
    } catch (exception) {
      console.log(exception);
      if (exception instanceof Array) {
        return res.status(400).json({
          message: 'invalid request',
          data: exception?.map((value) => value?.constraints),
        });
      }
      return res.status(400).json({
        message: 'invalid request',
        data: exception,
      });
    }
  };
}

export default DTOFilter;
