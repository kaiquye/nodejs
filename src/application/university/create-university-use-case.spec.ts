import {
  CreateUniversityUseCaseAdapter,
  ICreateUniversityIN,
} from './interfaces/create-university.interfaces';
import { UniversityMemoryRepository } from '../../infra/database/repositories/memory/university-memory.repository';
import { IUniversityRepository } from './repository/university-repository.interface';
import { CreateUniversityUseCase } from './create-university.use-case';
import { Response_ } from '../../domain/error/custom.error';
import { UniversityErrorsCodes } from '../../domain/error/codes/university-errors.codes';

describe('create a new university', function () {
  let service: CreateUniversityUseCaseAdapter;
  let repositoryInMemory: IUniversityRepository;

  beforeAll(() => {
    repositoryInMemory = new UniversityMemoryRepository();
    service = new CreateUniversityUseCase(repositoryInMemory);
  });

  afterAll(() => {
    service = null;
    repositoryInMemory = null;
  });

  test('shoud check if if it was defined', function () {
    expect(service).toBeDefined();
    expect(repositoryInMemory).toBeDefined();
  });

  test('should create a new university', async function () {
    const request: ICreateUniversityIN = {
      country: 'wrx-sti-impreza',
      countryCode: 'EX',
      domain: ['www.wrx.com'],
      name: 'petrolhead',
      stateProvince: 'example',
      webPages: ['example'],
    };

    const response = await service.Invoke(request);
    expect(response.data).toHaveProperty('name');
    expect(response.data).toHaveProperty('countryCode');
    expect(response.data).toHaveProperty('domain');
    expect(response.data).toHaveProperty('stateProvince');
    expect(response.data).toHaveProperty('webPages');
    expect(response.statusCode).toEqual(201);
    expect(response.success).toEqual(true);
  });

  test('should return university already registered', async function () {
    const request: ICreateUniversityIN = {
      country: 'wrx-sti-impreza',
      countryCode: 'EX',
      domain: ['www.wrx.com'],
      name: 'petrolhead',
      stateProvince: 'example',
      webPages: ['example'],
    };

    try {
      await service.Invoke(request);
    } catch (exception) {
      expect(exception.statusCode).toEqual(409);
      expect(exception.code).toEqual(UniversityErrorsCodes.CD0409);
      expect(exception.message).toEqual(
        'The university provided has already been registered previously',
      );
    }
  });
});
