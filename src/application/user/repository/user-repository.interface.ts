import { RepositoryAdapter } from '../../../domain/adapters/repository.adapter';
import { User } from '../../../domain/models/user.model';

export interface IUserRepository extends RepositoryAdapter<User> {
  create(data: User): Promise<User>;
  exists(data: Partial<User>): Promise<User>;
  update(data: Partial<User>): Promise<User>;
}
