import { Request, Response } from 'express';
import { CreateUniversityUseCase } from '../../../application/university/create-university.use-case';
import { autoInjectable, container } from 'tsyringe';
import { Response_ } from '../../../domain/error/custom.error';
import { ListUniversityUseCase } from '../../../application/university/list-university.use-case';
import { ListAllUniversityDto } from './dto/list-all-university.dto';

@autoInjectable()
class UniversityController {
  constructor(
    private readonly createUniversityUseCase: CreateUniversityUseCase,
    private readonly listUniversityUseCase: ListUniversityUseCase,
  ) {}

  async create(body): Promise<Response_> {
    return await this.createUniversityUseCase.Invoke(body);
  }

  async findAll(body, params, query): Promise<Response_> {
    return await this.listUniversityUseCase.Invoke(query);
  }
}

export const universityController = container.resolve(UniversityController);
