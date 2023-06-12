import {
  IUpdatePasswordIn,
  UpdatePasswordAdapter,
} from './interfaces/update-password.interface';
import { Response_ } from '../../domain/error/custom.error';
import { UserErrorsCodes } from '../../domain/error/codes/user-errors.codes';
import { Password } from '../../@config/password';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from './repository/user-repository.interface';

@injectable()
export class UpdatePasswordUseCase implements UpdatePasswordAdapter {
  constructor(
    @inject('user-repository')
    private readonly userRep: IUserRepository,
  ) {}
  async Invoke(input: IUpdatePasswordIn): Promise<Response_> {
    const userFound = await this.userRep.exists({
      email: input.email,
    });
    if (!userFound) {
      throw Response_.NotFoundException({
        message: 'user not found',
        code: UserErrorsCodes.CD0404,
      });
    }

    const password = new Password();
    const match = await password.compare(input.current_password, userFound.password);
    if (!match) {
      throw Response_.NotFoundException({
        message: 'user not found',
        code: UserErrorsCodes.CD0404,
      });
    }

    const updated = await this.userRep.updatePassword({
      email: input.email,
      password: input.new_password,
    });
    console.warn('USER UPDATED PASSWORD', updated.id);

    return Response_.Ok({
      status: true,
      description: 'password updated',
    });
  }
}
