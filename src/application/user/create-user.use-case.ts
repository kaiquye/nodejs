import 'reflect-metadata';
import {
  CreateUserUseCaseAdapter,
  ICreateUserIn,
} from './interfaces/create-user.interface';
import { Response_ } from '../../domain/error/custom.error';
import { IUserRepository } from './repository/user-repository.interface';
import { UserErrorsCodes } from '../../domain/error/codes/user-errors.codes';
import UserMapper from '../../domain/mappers/user.mapper';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserUseCase implements CreateUserUseCaseAdapter {
  constructor(
    @inject('user-repository')
    private readonly userRep: IUserRepository,
  ) {}
  async Invoke(input: ICreateUserIn): Promise<Response_> {
    const userAlreadyRegistered = await this.userRep.exists({ email: input.email });
    console.log(userAlreadyRegistered);
    if (userAlreadyRegistered) {
      throw Response_.ConflictException({
        message: 'user already registered',
        code: UserErrorsCodes.CD0409,
      });
    }

    const mapper = UserMapper.toDomain(input);
    const newUser = await this.userRep.create(mapper);

    return Response_.Created(newUser);
  }
}
