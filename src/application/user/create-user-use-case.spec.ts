import { CreateUserUseCase } from './create-user.use-case';
import { IUserRepository } from './repository/user-repository.interface';
import { UserMemoryRepository } from '../../infra/database/repositories/memory/user-memory.repository';
import { UserErrorsCodes } from '../../domain/error/codes/user-errors.codes';

describe('create a new user', function () {
  let service: CreateUserUseCase;
  let repositoryInMemory: IUserRepository;

  beforeAll(() => {
    repositoryInMemory = new UserMemoryRepository();
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

    try {
      await service.Invoke(request);
    } catch (exception) {
      expect(exception.statusCode).toEqual(409);
      expect(exception.code).toEqual(UserErrorsCodes.CD0409);
      expect(exception.message).toEqual('user already registered');
    }
  });
});
