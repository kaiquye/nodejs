import { IUserRepository } from '../../../../application/user/repository/user-repository.interface';
import { User } from '../../../../domain/models/user.model';

export class UserMemoryRepository extends IUserRepository {
  private database: User[] = [];
  create(data: User): Promise<User> {
    this.database.push(data);
    return Promise.resolve(data);
  }

  exists(data: Partial<User>): Promise<User> {
    const result = this.database.find((university) => university.email == data.email);
    return Promise.resolve(result);
  }

  updatePassword(data: Partial<User>): Promise<User> {
    return Promise.resolve(undefined);
  }
}
