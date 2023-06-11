import { FindUniversityByIdAdapter } from './interfaces/find-university-by-id.interfaces';
import { Response_ } from '../../domain/error/custom.error';

export class FindUniverisityByIdUseCase implements FindUniversityByIdAdapter {
  Invoke(input: string): Promise<Response_> {
    return Promise.resolve(undefined);
  }
}
