import { CreateUniversityUseCaseAdapter } from './interfaces/create-university.interfaces';
import { IUniversityRepository } from './repository/university-repository.interface';
import { UniversityMemoryRepository } from '../../infra/database/repositories/memory/university-memory.repository';

describe('delete university by id', function () {
  let service: CreateUniversityUseCaseAdapter;
  let repositoryInMemory: IUniversityRepository;

  beforeAll(() => {
    repositoryInMemory = new UniversityMemoryRepository();
    service = null;
  });

  afterAll(() => {
    service = null;
    repositoryInMemory = null;
  });

  test('shoud check if if it was defined', function () {
    expect(service).toBeDefined();
    expect(repositoryInMemory).toBeDefined();
  });

  test('should delete a university by id', async function () {
    const request = 'aaaa-bbbb-cccc-dddd'; //uuid

    const result = await service.Invoke(request);

    expect(result.data['status']).toHaveProperty('true');
    expect(result.data['deletedId']).toHaveProperty('aaaa-bbbb-cccc-dddd');
    expect(result.statusCode).toEqual(200);
    expect(result.success).toEqual(true);
  });
  test('should return university not foudn', async function () {
    const request = 'aaaa-bbbb-cccc-dddd'; //uuid

    const result = await service.Invoke(request);

    expect(result.statusCode).toEqual(404);
    expect(result.code).toEqual(404);
    expect(result.message).toEqual(
      'The university provided was not found in our database',
    );
    expect(result.success).toEqual(false);
  });
});
