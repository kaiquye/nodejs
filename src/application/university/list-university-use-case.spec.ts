import { UniversityMemoryRepository } from '../../infra/database/repositories/memory/university-memory.repository';
import { IUniversityRepository } from './repository/university-repository.interface';
import { CreateUniversityUseCase } from './create-university.use-case';
import {
  IListUniversityIn,
  ListUniversityAdapter,
} from './interfaces/list-university.interface';

describe('create a new university', function () {
  let service: ListUniversityAdapter;
  let repositoryInMemory: IUniversityRepository;

  beforeAll(() => {
    repositoryInMemory = new UniversityMemoryRepository();
  });

  test('should return a total list of the university', async function () {
    const input: IListUniversityIn = {
      search: {
        country: 'brazil',
      },
      pagination: {
        page: 1,
        perPage: 20,
      },
    };

    const result = await service.Invoke(input);
    expect(result.statusCode).toEqual(201);
    expect(result.success).toEqual(true);
    expect(result.data).toBeDefined();
  });

  test('should return an empty university list', async function () {
    const input: IListUniversityIn = {
      search: {
        country: 'brazil',
      },
      pagination: {
        page: 1,
        perPage: 20,
      },
    };

    const result = await service.Invoke(input);
    expect(result.statusCode).toEqual(201);
    expect(result.success).toEqual(true);
    expect(result.data?.['universities'].length).toEqual(0);
  });
});
