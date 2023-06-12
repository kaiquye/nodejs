import { IUserRepository } from '../../../../application/user/repository/user-repository.interface';
import { User } from '../../../../domain/models/user.model';

export class UserRepository extends IUserRepository {
  async create(data: User): Promise<User> {
    const rs = await this.Writing.create(data);
    await this.Writing.save(rs);
    return rs;
  }

  async exists(where: Partial<User>): Promise<User> {
    const rs = await this.Reading.find({ where });
    return rs[0];
  }

  async updatePassword(data: Partial<User>): Promise<Partial<User>> {
    const s = await this.Writing.update(
      { email: data.email },
      { password: data.password },
    );
    console.log(s);
    return data;
  }
}
