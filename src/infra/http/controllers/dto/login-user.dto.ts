import { DtoAdapter } from '../../../../domain/adapters/dto.adapter';
import { IsString } from 'class-validator';

export class LoginUserDto extends DtoAdapter {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
