import { Router } from 'express';
import { universityController } from '../controllers/university.controller';
import { InterceptorResponse } from '../../../domain/adapters/express-adapter';

const UniversityRoutes = Router();
const baseUrl = (url) => {
  return '/university' + url;
};

UniversityRoutes.post(
  baseUrl('/new'),
  // DTOFilter(CreateUniversityDto, 'BODY'),
  InterceptorResponse(universityController.create.bind(universityController)), // it is necessary to use because of dependency injection
);

export default UniversityRoutes;
