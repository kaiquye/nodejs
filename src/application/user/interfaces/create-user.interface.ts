import { UseCaseAdapter } from '../../../domain/adapters/use-case.adapter';
import { Response_ } from '../../../domain/error/custom.error';

export interface ICreateUserIn {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export type CreateUserUseCaseAdapter = UseCaseAdapter<
  ICreateUserIn,
  Promise<Response_>
>;
