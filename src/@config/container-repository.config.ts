import { container } from 'tsyringe';
import { UniversityRepository } from '../infra/database/repositories/postgres/university.repository';
import { UserRepository } from '../infra/database/repositories/postgres/user.repository';

container.registerSingleton('university-repository', UniversityRepository);
container.registerSingleton('user-repository', UserRepository);
