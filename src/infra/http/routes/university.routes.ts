import { Router } from 'express';
import { universityController } from '../controllers/university.controller';
import { InterceptorResponse } from '../../../domain/adapters/express-adapter';
import DTOFilter from '../filters/data-transfer-object.filter';
import { ListAllUniversityDto } from '../controllers/dto/list-all-university.dto';
import { CreateUniversityDto } from '../controllers/dto/create-university.dto';
import { plainToClass } from 'class-transformer';

const UniversityRoutes = Router();

UniversityRoutes.post(
  `/university/new`,
  DTOFilter(CreateUniversityDto, 'BODY'),
  InterceptorResponse(universityController.create.bind(universityController)), // it is necessary to use because of dependency injection
);
UniversityRoutes.get(
  `/university/list`,
  DTOFilter(ListAllUniversityDto, 'QUERY'),
  InterceptorResponse(universityController.findAll.bind(universityController)), // it is necessary to use because of dependency injection
);
UniversityRoutes.get(
  `/university/:university_id`,
  InterceptorResponse(universityController.findAll.bind(universityController)), // it is necessary to use because of dependency injection
);
UniversityRoutes.delete(
  `/university/:university_id`,
  InterceptorResponse(universityController.findAll.bind(universityController)), // it is necessary to use because of dependency injection
);

export default UniversityRoutes;
