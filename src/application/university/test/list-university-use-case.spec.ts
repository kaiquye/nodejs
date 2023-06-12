import { UniversityMemoryRepository } from '../../../infra/database/repositories/memory/university-memory.repository';
import { IUniversityRepository } from '../repository/university-repository.interface';
import { CreateUniversityUseCase } from '../create-university.use-case';
import {
  IListUniversityIn,
  ListUniversityAdapter,
} from '../interfaces/list-university.interface';
import { ListUniversityUseCase } from '../list-university.use-case';

describe('create a new university', function () {
  let service: ListUniversityAdapter;
  let repositoryInMemory: IUniversityRepository;

  beforeAll(() => {
    repositoryInMemory = new UniversityMemoryRepository();
    service = new ListUniversityUseCase(repositoryInMemory);
  });

  afterAll(() => {
    service = null;
    repositoryInMemory = null;
  });

  test('shoud check if if it was defined', function () {
    expect(service).toBeDefined();
    expect(repositoryInMemory).toBeDefined();
  });

  test('should return a total list of the university', async function () {
    const input: IListUniversityIn = {
      country: 'brazil',
      page: 1,
      perPage: 20,
    };

    const result = await service.Invoke(input);
    expect(result.statusCode).toEqual(200);
    expect(result.success).toEqual(true);
    expect(result.data).toBeDefined();
  });

  test('should return an empty university list', async function () {
    const input: IListUniversityIn = {
      country: 'UNKNOWN COUNTRY INVALID NOT VALID',
      page: 1,
      perPage: 20,
    };

    const result = await service.Invoke(input);
    expect(result.statusCode).toEqual(200);
    expect(result.success).toEqual(true);
    expect(result.data?.['list'].length).toEqual(0);
    expect(result.data?.['count']).toEqual(0);
    expect(result.data?.['current_page']).toEqual(1);
  });
});
