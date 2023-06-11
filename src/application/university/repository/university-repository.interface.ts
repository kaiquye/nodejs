import { RepositoryAdapter } from '../../../domain/adapters/repository.adapter';
import { University } from '../../../domain/models/university.model';
import { FindOptionsWhere } from 'typeorm';

export abstract class IUniversityRepository extends RepositoryAdapter<University> {
  constructor() {
    super(University);
  }
  abstract create(data: University): Promise<University>;
  abstract exists(data: FindOptionsWhere<University>): Promise<University>;
  abstract delete(university: University): Promise<University>;
  abstract update(data: University): Promise<University>;
  abstract findAllByCountry(
    country: string,
    page: number,
    perPage: number,
  ): Promise<University[]>;
}
