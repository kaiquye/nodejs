import { container } from 'tsyringe';
import { UniversityRepository } from '../infra/database/repositories/postgres/university.repository';

container.registerSingleton('university-repository', UniversityRepository);
