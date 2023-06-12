import { inject, injectable } from 'tsyringe';
import {
  CreateUniversityUseCaseAdapter,
  ICreateUniversityIN,
} from './interfaces/create-university.interfaces';
import { IUniversityRepository } from './repository/university-repository.interface';
import UniversityMapper from '../../domain/mappers/university.mapper';
import { Response_ } from '../../domain/error/custom.error';
import { UniversityErrorsCodes } from '../../domain/error/codes/university-errors.codes';

@injectable()
export class CreateUniversityUseCase implements CreateUniversityUseCaseAdapter {
  constructor(
    @inject('university-repository')
    private readonly universityRep: IUniversityRepository,
  ) {}

  async Invoke(input: ICreateUniversityIN): Promise<Response_> {
    const universityAlreadyRegistered = await this.universityRep.exists({
      name: input.name,
      country: input.country,
    });

    if (universityAlreadyRegistered) {
      throw Response_.ConflictException({
        message: 'The university provided has already been registered previously',
        code: UniversityErrorsCodes.CD0409,
      });
    }

    const mapper = UniversityMapper.toDomain(input);

    const newUniversity = await this.universityRep.create(mapper);
    return Response_.Created(newUniversity);
  }
}
