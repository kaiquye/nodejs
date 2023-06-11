import {
  IUpdateUniversityIn,
  UpdateUniversityAdapter,
} from './interfaces/update-university.interface';
import { Response_ } from '../../domain/error/custom.error';
import { inject } from 'tsyringe';
import { IUniversityRepository } from './repository/university-repository.interface';
import { UniversityErrorsCodes } from '../../domain/codes/university-errors.codes';

export class UpdateUniversityUseCase implements UpdateUniversityAdapter {
  constructor(
    @inject('university-repository')
    private readonly universityRep: IUniversityRepository,
  ) {}
  async Invoke(input: IUpdateUniversityIn): Promise<Response_> {
    const universityFound = await this.universityRep.exists({
      id: input.updateForThisId,
    });

    if (!universityFound) {
      throw Response_.NotFoundException({
        message: 'The university provided was not found in our database',
        code: UniversityErrorsCodes.CD0404,
      });
    }

    const updated = await this.universityRep.update(
      input.updateForThisId,
      input.updateForThisId,
    );

    return Response_.Ok(updated);
  }
}
