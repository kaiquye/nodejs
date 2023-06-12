import { Router } from 'express';
import UniversityRoutes from './university.routes';
import UserRoutes from './user.routes';

const AppRoutes = Router();

AppRoutes.use('/server/v1/university', UniversityRoutes);
AppRoutes.use('/server/v1/user', UserRoutes);

export default AppRoutes;
