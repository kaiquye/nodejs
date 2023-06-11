import { UseCaseAdapter } from '../../../domain/adapters/use-case.adapter';
import { Response_ } from '../../../domain/error/custom.error';

export type FindUniversityByIdAdapter = UseCaseAdapter<string, Promise<Response_>>;
