import { CreateUniversityUseCase } from '../../../application/university/create-university.use-case';
import { autoInjectable, container } from 'tsyringe';
import { Response_ } from '../../../domain/error/custom.error';
import { ListUniversityUseCase } from '../../../application/university/list-university.use-case';
import { FindUniversityByIdUseCase } from '../../../application/university/find-university-by-id.use.case';
import { DeleteUniversityUseCase } from '../../../application/university/delete-university.use-case';
import { UpdateUniversityUseCase } from '../../../application/university/update-university.use-case';
import {
  UpdateUniversityDtoBody,
  UpdateUniversityDtoParams,
} from './dto/update-university.dto';
import { FindUniversityByIdDto } from './dto/find-university-by-id.dto';
import { ListAllUniversityDto } from './dto/list-all-university.dto';
import { CreateUniversityDto } from './dto/create-university.dto';
import { DeleteUniversityDto } from './dto/delete-university.dto';

@autoInjectable()
class UniversityController {
  constructor(
    private readonly createUniversityUseCase: CreateUniversityUseCase,
    private readonly listUniversityUseCase: ListUniversityUseCase,
    private readonly findUniversityByIdUseCase: FindUniversityByIdUseCase,
    private readonly updateUniversityUseCase: UpdateUniversityUseCase,
    private readonly deleteUniversityUseCase: DeleteUniversityUseCase,
  ) {}

  async create(body: CreateUniversityDto): Promise<Response_> {
    return await this.createUniversityUseCase.Invoke(body);
  }

  async findAll(body, params, query: ListAllUniversityDto): Promise<Response_> {
    return await this.listUniversityUseCase.Invoke(query);
  }
  async findById(body, params: FindUniversityByIdDto): Promise<Response_> {
    return await this.findUniversityByIdUseCase.Invoke(params.university_id);
  }
  async update(
    body: UpdateUniversityDtoBody,
    params: UpdateUniversityDtoParams,
  ): Promise<Response_> {
    return await this.updateUniversityUseCase.Invoke({
      ...body,
      updateForThisId: params.university_id,
    });
  }
  async delete(body, params: DeleteUniversityDto): Promise<Response_> {
    return await this.deleteUniversityUseCase.Invoke(params.university_id);
  }
}

export const universityController = container.resolve(UniversityController);
