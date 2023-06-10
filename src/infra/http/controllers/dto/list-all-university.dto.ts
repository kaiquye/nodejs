import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DtoAdapter } from '../../../../domain/adapters/dto-adapter';
import { Transform, Type } from 'class-transformer';

export class ListAllUniversityDto extends DtoAdapter {
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  perPage: number;
}
