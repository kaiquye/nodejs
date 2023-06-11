import {
  IUpdateUniversityIn,
  UpdateUniversityAdapter,
} from './interfaces/update-university.interface';
import { Response_ } from '../../domain/error/custom.error';
import { inject, injectable } from 'tsyringe';
import { IUniversityRepository } from './repository/university-repository.interface';
import { UniversityErrorsCodes } from '../../domain/codes/university-errors.codes';
import { University } from '../../domain/models/university.model';

@injectable()
export class UpdateUniversityUseCase implements UpdateUniversityAdapter {
  // check if the data that should be unique in the database has been send
  private checkUniqueData(data: University) {
    return !!(data.name && data.country);
  }
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

    if (this.checkUniqueData(input.infos)) {
      const universityAlreadyRegistered = await this.universityRep.exists({
        name: input.infos.name,
        country: input.infos.country,
      });

      if (universityAlreadyRegistered) {
        throw Response_.ConflictException({
          message: 'The university provided has already been registered previously',
          code: UniversityErrorsCodes.CD0409,
        });
      }
    }

    const updated = await this.universityRep.update(input.infos);

    return Response_.Ok(updated);
  }
}
