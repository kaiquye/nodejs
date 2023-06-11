import { Router } from 'express';
import UniversityRoutes from './university.routes';

const AppRoutes = Router();

AppRoutes.use('/server/v1', UniversityRoutes);

export default AppRoutes;
