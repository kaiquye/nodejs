import { UseCaseAdapter } from '../../../domain/adapters/use-case.adapter';
import { Response_ } from '../../../domain/error/custom.error';

export interface IAuthenticationIn {
  access_token: string;
}

export type AuthenticationAdapter = UseCaseAdapter<
  IAuthenticationIn,
  Promise<Response_>
>;
