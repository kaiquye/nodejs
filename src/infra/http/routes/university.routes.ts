import { Router } from 'express';
import { universityController } from '../controllers/university.controller';
import { InterceptorResponse } from '../../../domain/adapters/express-adapter';
import DTOFilter from '../filters/data-transfer-object.filter';
import { ListAllUniversityDto } from '../controllers/dto/list-all-university.dto';
import { CreateUniversityDto } from '../controllers/dto/create-university.dto';
import { FindUniversityByIdDto } from '../controllers/dto/find-university-by-id.dto';
import { DeleteUniversityDto } from '../controllers/dto/delete-university.dto';
import {
  UpdateUniversityDtoBody,
  UpdateUniversityDtoParams,
} from '../controllers/dto/update-university.dto';

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
  DTOFilter(FindUniversityByIdDto, 'PARAMS'),
  InterceptorResponse(universityController.findById.bind(universityController)), // it is necessary to use because of dependency injection
);
UniversityRoutes.patch(
  `/university/:university_id`,
  DTOFilter(UpdateUniversityDtoParams, 'PARAMS'),
  DTOFilter(UpdateUniversityDtoBody, 'BODY'),
  InterceptorResponse(universityController.update.bind(universityController)), // it is necessary to use because of dependency injection
);
UniversityRoutes.delete(
  `/university/:university_id`,
  DTOFilter(DeleteUniversityDto, 'PARAMS'),
  InterceptorResponse(universityController.delete.bind(universityController)), // it is necessary to use because of dependency injection
);

export default UniversityRoutes;
