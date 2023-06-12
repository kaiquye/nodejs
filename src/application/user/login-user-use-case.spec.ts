import { IUserRepository } from './repository/user-repository.interface';
import { UserMemoryRepository } from '../../infra/database/repositories/memory/user-memory.repository';
import { UserErrorsCodes } from '../../domain/error/codes/user-errors.codes';
import { LoginUseCase } from './login.use-case';
import { CreateUserUseCase } from './create-user.use-case';

describe('login user', function () {
  let service: LoginUseCase;
  let repositoryInMemory: IUserRepository;

  beforeAll(() => {
    repositoryInMemory = new UserMemoryRepository();
    service = new LoginUseCase(repositoryInMemory);
  });

  afterAll(() => {
    service = null;
    repositoryInMemory = null;
  });

  test('should check if if it was defined', function () {
    expect(service).toBeDefined();
    expect(repositoryInMemory).toBeDefined();
  });
  test('should error return user not found', async function () {
    const request = {
      email: 'kaic.email@gmail.com',
      password: 'D34DS@S',
    };

    try {
      await service.Invoke(request);
    } catch (exception) {
      console.log(exception);
      expect(exception.statusCode).toEqual(404);
      expect(exception.code).toEqual(UserErrorsCodes.CD0404);
      expect(exception.message).toEqual('user not found');
    }
  });
});
