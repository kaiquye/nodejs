import { DeleteUniversityAdapter } from './interfaces/delete-university.interfaces';
import { Response_ } from '../../domain/error/custom.error';
import { inject } from 'tsyringe';
import { IUniversityRepository } from './repository/university-repository.interface';
import { UniversityErrorsCodes } from '../../domain/codes/university-errors.codes';

export class DeleteUniversityUseCase implements DeleteUniversityAdapter {
  constructor(
    @inject('university-repository')
    private readonly universityRep: IUniversityRepository,
  ) {}
  async Invoke(univeristyId: string): Promise<Response_> {
    const universityFound = await this.universityRep.exists({
      id: univeristyId,
    });

    if (!universityFound) {
      throw Response_.NotFoundException({
        message: 'The university provided was not found in our database',
        code: UniversityErrorsCodes.CD0404,
      });
    }
    /**
     * @ Esta apagando o registro do banco de dados. Alterar para apenas mudar o status do registro.
     */
    await this.universityRep.delete(univeristyId);
  }
}
