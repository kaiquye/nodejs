import { User } from '../models/user.model';
import { ICreateUserIn } from '../../application/user/interfaces/create-user.interface';

class UserMapper {
  toDomain(data: ICreateUserIn): User {
    const mapper = new User();
    mapper.name = data.name;
    mapper.email = data.email;
    mapper.phone = data.phone;
    mapper.password = data.password;
    return mapper;
  }

  toView(data: User): Partial<User> {
    delete data.created_at;
    delete data.updated_at;

    return data;
  }
}

export default new UserMapper();
