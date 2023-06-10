import {
  IListUniversityIn,
  ListUniversityAdapter,
} from './interfaces/list-university.interface';
import { Response_ } from '../../domain/error/custom.error';
import { inject, injectable } from 'tsyringe';
import { IUniversityRepository } from './repository/university-repository.interface';

@injectable()
export class ListUniversityUseCase implements ListUniversityAdapter {
  constructor(
    @inject('university-repository')
    private readonly universityRep: IUniversityRepository,
  ) {}

  async Invoke(input: IListUniversityIn): Promise<Response_> {
    const listOfUniversities = this.universityRep.findAllByCountry(
      input.search.country,
      input.pagination.page,
      input.pagination.perPage,
    );

    const list = listOfUniversities ?? [];
    return Response_.Ok(list);
  }
}
