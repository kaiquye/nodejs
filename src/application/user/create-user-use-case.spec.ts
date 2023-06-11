import { UniversityErrorsCodes } from '../../domain/error/codes/university-errors.codes';
import { CreateUserUseCase } from './create-user.use-case';
import { IUserRepository } from './repository/user-repository.interface';

describe('create a new user', function () {
  let service: CreateUserUseCase;
  let repositoryInMemory: IUserRepository;

  beforeAll(() => {
    repositoryInMemory;
    service = new CreateUserUseCase(repositoryInMemory);
  });

  afterAll(() => {
    service = null;
    repositoryInMemory = null;
  });

  test('shoud check if if it was defined', function () {
    expect(service).toBeDefined();
    expect(repositoryInMemory).toBeDefined();
  });

  test('should return a new user', async function () {
    const request = {
      name: 'Kaic Mendes',
      email: 'kaic.email@gmail.com',
      phone: '000000000',
      password: 'D34DS@S',
    };

    const result = await service.Invoke(request);

    expect(result.data).toHaveProperty('name');
    expect(result.data).toHaveProperty('email');
    expect(result.statusCode).toEqual(201);
    expect(result.success).toEqual(true);
  });
  test('should error return that a user already exists', async function () {
    const request = {
      name: 'Kaic Mendes',
      email: 'kaic.email@gmail.com',
      phone: '000000000',
      password: 'D34DS@S',
    };

    await service.Invoke(request);
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
