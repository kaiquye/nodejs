import { University } from '../../../domain/models/university.model';
import { UseCaseAdapter } from '../../../domain/adapters/use-case.adapter';
import { Response_ } from '../../../domain/error/custom.error';

export interface IListUniversityIn {
  pagination: {
    page: number;
    perPage: number; // limit for page
  };
  search: {
    country: string;
  };
}

export type ListUniversityAdapter = UseCaseAdapter<
  IListUniversityIn,
  Promise<Response_>
>;
