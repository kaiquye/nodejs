import { UseCaseAdapter } from '../../../domain/adapters/use-case.adapter';
import { Response_ } from '../../../domain/error/custom.error';

export interface IUpdatePasswordIn {
  email: string;
  current_password: string;
  new_password: string;
}

export type UpdatePasswordAdapter = UseCaseAdapter<
  IUpdatePasswordIn,
  Promise<Response_>
>;
