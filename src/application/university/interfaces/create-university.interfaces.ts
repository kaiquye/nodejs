import { Response_ } from '../../../domain/error/custom.error';
import { University } from '../../../domain/models/university.model';
import { UseCaseAdapter } from '../../../domain/adapters/use-case.adapter';

export interface ICreateUniversityIN {
  name: string;
  stateProvince?: string;
  country?: string;
  countryCode: string;
  domain?: string[];
  webPages?: string[];
}

export type CreateUniversityUseCaseAdapter = UseCaseAdapter<
  ICreateUniversityIN,
  Promise<Response_>
>;
