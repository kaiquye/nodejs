import {
  IUpdateUniversityIn,
  UpdateUniversityAdapter,
} from './interfaces/update-university.interface';
import { Response_ } from '../../domain/error/custom.error';
import { inject, injectable } from 'tsyringe';
import { IUniversityRepository } from './repository/university-repository.interface';
import { UniversityErrorsCodes } from '../../domain/codes/university-errors.codes';

@injectable()
export class UpdateUniversityUseCase implements UpdateUniversityAdapter {
  // check if the data that should be unique in the database has been send

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

    /**
     * @description Armazene os valores que são únicos para evitar erros durante a atualização.
     */
    const UniqueFields = {
      name: input.infos?.name ?? universityFound?.name,
      countryCode: input.infos?.countryCode ?? universityFound?.countryCode,
    };

    if (input.infos?.name || input.infos?.countryCode) {
      const universityAlreadyRegistered = await this.universityRep.exists({
        name: UniqueFields.name,
        country: UniqueFields.countryCode,
      });

      if (universityAlreadyRegistered) {
        throw Response_.ConflictException({
          message: 'name or country Code already registered in our database',
          code: UniversityErrorsCodes.CD0409,
        });
      }
    }

    const updated = await this.universityRep.update(input.infos);

    return Response_.Ok(updated);
  }
}
