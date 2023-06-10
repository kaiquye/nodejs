import { DtoAdapter } from '../../../domain/adapters/dto-adapter';
import { IPathsDto } from '../../../domain/interfaces/filters.interfaces';
import { plainToClass } from 'class-transformer';

function DTOFilter<T extends DtoAdapter>(Dto: new () => T, path: IPathsDto) {
  return async (req, res, next) => {
    try {
      const body = req?.body;
      const param = req?.param;
      const query = req?.query;

      let request: DtoAdapter;
      switch (path) {
        case 'BODY':
          request = plainToClass(Dto, body);
          await request.isValid();
          break;
        case 'PARAMS':
          request = plainToClass(Dto, param);
          await request.isValid();
          break;
        case 'QUERY':
          request = plainToClass(Dto, query);
          await request.isValid();
          break;
        default:
          return next();
      }
      return next();
    } catch (exception) {
      res.status(400).json({
        message: 'invalid request',
        data: exception?.map((value) => value?.constraints),
      });
    }
  };
}

export default DTOFilter;
