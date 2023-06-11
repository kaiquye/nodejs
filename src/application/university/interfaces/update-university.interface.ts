import { UseCaseAdapter } from '../../../domain/adapters/use-case.adapter';
import { University } from '../../../domain/models/university.model';
import { Response_ } from '../../../domain/error/custom.error';

export interface IUpdateUniversityIn {
  updateForThisId: string;
  infos: Partial<University>;
}

export type UpdateUniversityAdapter = UseCaseAdapter<
  IUpdateUniversityIn,
  Promise<Response_>
>;
