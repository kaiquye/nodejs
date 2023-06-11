import { UseCaseAdapter } from '../../../domain/adapters/use-case.adapter';
import { Response_ } from '../../../domain/error/custom.error';

export interface IListUniversityIn {
  page: number;
  perPage: number; // limit for page
  country: string;
}

export type ListUniversityAdapter = UseCaseAdapter<
  IListUniversityIn,
  Promise<Response_>
>;
