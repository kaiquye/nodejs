import { RepositoryAdapter } from '../../../domain/adapters/repository.adapter';
import { User } from '../../../domain/models/user.model';

export abstract class IUserRepository extends RepositoryAdapter<User> {
  constructor() {
    super(User);
  }
  abstract create(data: User): Promise<User>;
  abstract exists(data: Partial<User>): Promise<User>;
  abstract updatePassword(data: Partial<User>): Promise<Partial<User>>;
}
