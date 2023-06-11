import { UniversityMemoryRepository } from '../../infra/database/repositories/memory/university-memory.repository';
import { CreateUniversityUseCase } from './create-university.use-case';
import { DeleteUniversityUseCase } from './delete-university.use-case';
import {
  CreateUniversityUseCaseAdapter,
  ICreateUniversityIN,
} from './interfaces/create-university.interfaces';
import { IUniversityRepository } from './repository/university-repository.interface';
import { UniversityErrorsCodes } from '../../domain/codes/university-errors.codes';

describe('find university by id', function () {
  let service;
  let createUniversityUseCase: CreateUniversityUseCaseAdapter;
  let repositoryInMemory: IUniversityRepository;

  beforeAll(() => {
    repositoryInMemory = new UniversityMemoryRepository();
    createUniversityUseCase = new CreateUniversityUseCase(repositoryInMemory);
    service = new DeleteUniversityUseCase(repositoryInMemory);
  });

  afterAll(() => {
    service = null;
    repositoryInMemory = null;
    createUniversityUseCase = null;
  });

  test('should check if if it was defined', function () {
    expect(service).toBeDefined();
    expect(repositoryInMemory).toBeDefined();
  });

  test('should find a university by id', async function () {
    const mock: ICreateUniversityIN = {
      country: 'wrx-sti-impreza',
      countryCode: 'EX',
      domain: ['www.wrx.com'],
      name: 'petrolhead',
      stateProvince: 'example',
      webPages: ['example'],
    };

    const university = await createUniversityUseCase.Invoke(mock);
    const result = await service.Invoke(university.data['id']);

    expect(result.success).toEqual(true);
    expect(result.data['university']).toEqual(university.data);
  });
  test('should return not found', async function () {
    const request = 'aaaa-bbbb-cccc-dddd'; //uuid

    try {
      await service.Invoke(request);
    } catch (exception) {
      expect(exception.statusCode).toEqual(404);
      expect(exception.code).toEqual(UniversityErrorsCodes.CD0404);
      expect(exception.message).toEqual(
        'The university provided was not found in our database',
      );
      expect(exception.success).toEqual(false);
    }
  });
});
