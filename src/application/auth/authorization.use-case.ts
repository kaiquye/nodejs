import {
  AuthorizationAdapter,
  IAuthorizationIn,
} from './interfaces/authorization.interfaces';
import { Response_ } from '../../domain/error/custom.error';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../user/repository/user-repository.interface';
import { UserErrorsCodes } from '../../domain/error/codes/user-errors.codes';
import { Password } from '../../@config/password';
import { JsonWebTokenConfig } from '../../@config/json-web-token.config';

@injectable()
export class AuthorizationUseCase implements AuthorizationAdapter {
  constructor(
    @inject('user-repository')
    private readonly userRep: IUserRepository,
  ) {}
  async Invoke(input: IAuthorizationIn): Promise<Response_> {
    const userFound = await this.userRep.exists({
      email: input.email,
    });

    if (!userFound) {
      throw Response_.NotFoundException({
        message: 'user not found',
        code: UserErrorsCodes.CD0404,
      });
    }

    const pass = new Password();
    const match = await pass.compare(input.password, userFound.password);

    if (!match) {
      throw Response_.NotFoundException({
        message: 'user not found',
        code: UserErrorsCodes.CD0404,
      });
    }

    const jwt = new JsonWebTokenConfig();
    const claims = ['writing, reading, global_access'];
    const newAccessToken = await jwt.sing(
      { name: userFound.name, email: userFound.email },
      claims,
    );

    // const key = 'claims' + userFound.id;
    // await Redis.set(key, JSON.stringify({ claims: claims }));
    // await Redis.set(userFound.id, JSON.stringify(newAccessToken));

    return Response_.Ok({
      access_token: newAccessToken,
    });
  }
}
