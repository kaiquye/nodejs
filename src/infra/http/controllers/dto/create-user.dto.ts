import { DtoAdapter } from '../../../../domain/adapters/dto.adapter';
import { IsPhoneNumber, IsString, Matches } from 'class-validator';

export class CreateUserDto extends DtoAdapter {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  @IsPhoneNumber('BR')
  phone: string;
  @Matches(/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, {
    message:
      'A senha deve conter pelo menos 8 caracteres, incluindo caracteres especiais, letras maiúsculas, letras minúsculas e números.',
  })
  password: string;
}
