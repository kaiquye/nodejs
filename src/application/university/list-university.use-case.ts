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
    const listOfUniversities = await this.universityRep.findAllByCountry(
      input?.country,
      Number(input.page) || 0,
      input?.perPage || 10,
    );

    const list = listOfUniversities ?? [];
    return Response_.Ok({
      count: list.length,
      search: input?.country,
      current_page: input?.page || 0,
      per_page: input?.perPage || 10,
      list,
    });
  }
}
