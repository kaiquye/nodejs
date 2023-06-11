import {
  CreateUserUseCaseAdapter,
  ICreateUserIn,
} from './interfaces/create-user.interface';
import { Response_ } from '../../domain/error/custom.error';

export class CreateUserUseCase implements CreateUserUseCaseAdapter {
  async Invoke(input: ICreateUserIn): Promise<Response_> {
    return Promise.resolve(undefined);
  }
}
