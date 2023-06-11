import { UniversityMemoryRepository } from '../../infra/database/repositories/memory/university-memory.repository';
import { IUniversityRepository } from './repository/university-repository.interface';
import {
  IListUniversityIn,
  ListUniversityAdapter,
} from './interfaces/list-university.interface';
import { ListUniversityUseCase } from './list-university.use-case';
import {UniversityErrorsCodes} from "../../domain/codes/university-errors.codes";

describe('update a  university', function () {
  let service: ;
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

  test('should return not found university', async function () {
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
