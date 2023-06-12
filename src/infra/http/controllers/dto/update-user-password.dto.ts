import { DtoAdapter } from '../../../../domain/adapters/dto.adapter';
import { IsEmail, IsString, Matches } from 'class-validator';

export class UpdateUserPasswordDto extends DtoAdapter {
  @IsEmail()
  email: string;
  @IsString()
  current_password: string;
  @Matches(/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, {
    message:
      'A senha deve conter pelo menos 8 caracteres, incluindo caracteres especiais, letras maiúsculas, letras minúsculas e números.',
  })
  new_password: string;
}
