import { CreateUniversityUseCase } from '../../../application/university/create-university.use-case';
import { autoInjectable, container } from 'tsyringe';
import { Response_ } from '../../../domain/error/custom.error';
import { ListUniversityUseCase } from '../../../application/university/list-university.use-case';
import { FindUniversityByIdUseCase } from '../../../application/university/find-university-by-id.use.case';
import { DeleteUniversityUseCase } from '../../../application/university/delete-university.use-case';
import { UpdateUniversityUseCase } from '../../../application/university/update-university.use-case';

@autoInjectable()
class UniversityController {
  constructor(
    private readonly createUniversityUseCase: CreateUniversityUseCase,
    private readonly listUniversityUseCase: ListUniversityUseCase,
    private readonly findUniversityByIdUseCase: FindUniversityByIdUseCase,
    private readonly updateUniversityUseCase: UpdateUniversityUseCase,
    private readonly deleteUniversityUseCase: DeleteUniversityUseCase,
  ) {}

  async create(body): Promise<Response_> {
    return await this.createUniversityUseCase.Invoke(body);
  }

  async findAll(body, params, query): Promise<Response_> {
    return await this.listUniversityUseCase.Invoke(query);
  }
  async findById(body, params): Promise<Response_> {
    return await this.findUniversityByIdUseCase.Invoke(params);
  }
  async update(body, params): Promise<Response_> {
    return await this.updateUniversityUseCase.Invoke({ ...body, ...params });
  }
  async delete(body, params): Promise<Response_> {
    return await this.deleteUniversityUseCase.Invoke({ ...body, ...params });
  }
}

export const universityController = container.resolve(UniversityController);
