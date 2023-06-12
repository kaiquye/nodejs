import { UseCaseAdapter } from '../../../domain/adapters/use-case.adapter';
import { Response_ } from '../../../domain/error/custom.error';

export interface IAuthorizationIn {
  email: string;
  password: string;
}

export type AuthorizationAdapter = UseCaseAdapter<IAuthorizationIn, Promise<Response_>>;
