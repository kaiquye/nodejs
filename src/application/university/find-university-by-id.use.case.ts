import { FindUniversityByIdAdapter } from './interfaces/find-university-by-id.interfaces';
import { Response_ } from '../../domain/error/custom.error';
import { inject, injectable } from 'tsyringe';
import { IUniversityRepository } from './repository/university-repository.interface';
import { UniversityErrorsCodes } from '../../domain/error/codes/university-errors.codes';

@injectable()
export class FindUniversityByIdUseCase implements FindUniversityByIdAdapter {
  constructor(
    @inject('university-repository')
    private readonly universityRep: IUniversityRepository,
  ) {}

  async Invoke(universityId: string): Promise<Response_> {
    const universityFound = await this.universityRep.exists({
      id: universityId,
    });

    if (!universityFound) {
      throw Response_.NotFoundException({
        message: 'The university provided was not found in our database',
        code: UniversityErrorsCodes.CD0404,
      });
    }

    return Response_.Ok(universityFound);
  }
}
