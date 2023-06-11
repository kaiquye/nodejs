import { DeleteUniversityAdapter } from './interfaces/delete-university.interfaces';
import { Response_ } from '../../domain/error/custom.error';
import { inject, injectable } from 'tsyringe';
import { IUniversityRepository } from './repository/university-repository.interface';
import { UniversityErrorsCodes } from '../../domain/codes/university-errors.codes';

@injectable()
export class DeleteUniversityUseCase implements DeleteUniversityAdapter {
  constructor(
    @inject('university-repository')
    private readonly universityRep: IUniversityRepository,
  ) {}
  async Invoke(univeristyId: string): Promise<Response_> {
    const universityFound = await this.universityRep.exists({
      id: univeristyId,
    });

    console.log(universityFound);

    if (!universityFound) {
      throw Response_.NotFoundException({
        message: 'The university provided was not found in our database',
        code: UniversityErrorsCodes.CD0404,
      });
    }

    /**
     * @AVISO: "Em vez de apagar o registro do banco de dados, devemos apenas alterar o status do registro."
     */
    await this.universityRep.delete(universityFound);

    return Response_.Ok({
      deletedId: univeristyId,
      status: true,
    });
  }
}
