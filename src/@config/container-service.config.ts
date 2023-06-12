import { container } from 'tsyringe';
import { CreateUniversityUseCase } from '../application/university/create-university.use-case';
import { DeleteUniversityUseCase } from '../application/university/delete-university.use-case';
import { FindUniversityByIdUseCase } from '../application/university/find-university-by-id.use.case';
import { ListUniversityUseCase } from '../application/university/list-university.use-case';
import { UpdateUniversityUseCase } from '../application/university/update-university.use-case';
import { CreateUserUseCase } from '../application/user/create-user.use-case';
import { UpdatePasswordUseCase } from '../application/user/update-password.use-case';
import { LoginUseCase } from '../application/user/login.use-case';

container.registerSingleton('create-university-use-case', CreateUniversityUseCase);
container.registerSingleton('delete-university-use-case', DeleteUniversityUseCase);
container.registerSingleton(
  'find-by-id-university-use-case',
  FindUniversityByIdUseCase,
);
container.registerSingleton('list-university-use-case', ListUniversityUseCase);
container.registerSingleton('update-university-use-case', UpdateUniversityUseCase);

container.registerSingleton('create-user-use-case', CreateUserUseCase);
container.registerSingleton('login-user-use-case', LoginUseCase);
container.registerSingleton('updated-user-use-case', UpdatePasswordUseCase);
