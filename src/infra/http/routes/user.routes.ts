import DTOFilter from '../filters/data-transfer-object.filter';
import { InterceptorResponse } from '../../../domain/adapters/express.adapter';
import { CreateUserDto } from '../controllers/dto/create-user.dto';
import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { LoginUserDto } from '../controllers/dto/login-user.dto';
import { UpdateUserPasswordDto } from '../controllers/dto/update-user-password.dto';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';

const UserRoutes = Router();

UserRoutes.post(
  `/new`,
  DTOFilter(CreateUserDto, 'BODY'),
  InterceptorResponse(userController.create.bind(userController)), // it is necessary to use because of dependency injection
);
UserRoutes.post(
  `/login`,
  DTOFilter(LoginUserDto, 'BODY'),
  InterceptorResponse(userController.login.bind(userController)), // it is necessary to use because of dependency injection
);

UserRoutes.use(AuthenticationMiddleware);
UserRoutes.patch(
  `/update/password`,
  DTOFilter(UpdateUserPasswordDto, 'BODY'),
  InterceptorResponse(userController.updatedPassword.bind(userController)), // it is necessary to use because of dependency injection
);

export default UserRoutes;
