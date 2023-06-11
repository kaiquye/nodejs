import { IsObject, IsUUID } from 'class-validator';
import { DtoAdapter } from '../../../../domain/adapters/dto-adapter';
import { University } from '../../../../domain/models/university.model';

export class UpdateUniversityDtoBody extends DtoAdapter {
  @IsObject()
  infos: Partial<University>;
}

export class UpdateUniversityDtoParams extends DtoAdapter {
  @IsUUID()
  university_id: string;
}
