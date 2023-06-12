import { UniversityMemoryRepository } from '../../../infra/database/repositories/memory/university-memory.repository';
import { IUniversityRepository } from '../repository/university-repository.interface';
import { UpdateUniversityAdapter } from '../interfaces/update-university.interface';
import { UpdateUniversityUseCase } from '../update-university.use-case';
import { UniversityErrorsCodes } from '../../../domain/error/codes/university-errors.codes';

describe('update a  university', function () {
  let service: UpdateUniversityAdapter;
  let repositoryInMemory: IUniversityRepository;

  beforeAll(() => {
    repositoryInMemory = new UniversityMemoryRepository();
    service = new UpdateUniversityUseCase(repositoryInMemory);
  });

  afterAll(() => {
    service = null;
    repositoryInMemory = null;
  });

  test('shoud check if if it was defined', function () {
    expect(service).toBeDefined();
    expect(repositoryInMemory).toBeDefined();
  });

  test('should return not found university', async function () {
    const request = 'aaaa-bbbb-cccc-dddd'; //uuid

    try {
      await service.Invoke({ updateForThisId: request, infos: { name: 'Kaic' } });
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
