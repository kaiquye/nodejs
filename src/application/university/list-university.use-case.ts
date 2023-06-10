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
    console.log(input);
    const listOfUniversities = await this.universityRep.findAllByCountry(
      input?.search?.country,
      Number(input?.pagination?.page) || 0,
      input?.pagination?.perPage || 10,
    );

    const list = listOfUniversities ?? [];
    return Response_.Ok({
      count: list.length,
      current_page: input.pagination.page,
      per_page: input.pagination.perPage,
      list,
    });
  }
}
