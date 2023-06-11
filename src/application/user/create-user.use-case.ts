import {
  CreateUserUseCaseAdapter,
  ICreateUserIn,
} from './interfaces/create-user.interface';
import { Response_ } from '../../domain/error/custom.error';
import { inject } from 'tsyringe';

export class CreateUserUseCase implements CreateUserUseCaseAdapter {
  constructor(
    @inject('user-repository')
    private readonly userRep: IUserRepository,
  ) {}
  async Invoke(input: ICreateUserIn): Promise<Response_> {
    return null;
  }
}
