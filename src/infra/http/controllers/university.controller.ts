import { Request, Response } from 'express';
import { CreateUniversityUseCase } from '../../../application/university/create-university.use-case';
import { autoInjectable, container } from 'tsyringe';
import { Response_ } from '../../../domain/error/custom.error';

@autoInjectable()
class UniversityController {
  constructor(private readonly createUniversityUseCase: CreateUniversityUseCase) {}
  async create(body): Promise<Response_> {
    return await this.createUniversityUseCase.Invoke(body);
  }
}

export const universityController = container.resolve(UniversityController);
