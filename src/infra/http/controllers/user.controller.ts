import { autoInjectable, container } from 'tsyringe';
import { CreateUserUseCase } from '../../../application/user/create-user.use-case';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUseCase } from '../../../application/user/login.use-case';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordUseCase } from '../../../application/user/update-password.use-case';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@autoInjectable()
class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly auth: LoginUseCase,
    private readonly updatedPasswordUseCase: UpdatePasswordUseCase,
  ) {}
  async create(body: CreateUserDto) {
    return this.createUserUseCase.Invoke(body);
  }
  async login(body: LoginUserDto) {
    return this.auth.Invoke(body);
  }
  async updatedPassword(body: UpdateUserPasswordDto) {
    return this.updatedPasswordUseCase.Invoke(body);
  }
}

export const userController = container.resolve(UserController);
