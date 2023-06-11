import { IsUUID } from 'class-validator';
import { DtoAdapter } from '../../../../domain/adapters/dto-adapter';

export class DeleteUniversityDto extends DtoAdapter {
  @IsUUID()
  university_id: string;
}
