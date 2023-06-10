import { DtoAdapter } from "../../../domain/adapters/dto-adapter";
import { IsArray, IsString, Length } from "class-validator";

export class CreateUniversityDto extends DtoAdapter {
  @IsString()
  name: string;
  @IsString()
  stateProvince: string;
  @IsString()
  country: string;
  @IsString()
  @Length(2, 3)
  countryCode: string;
  @IsArray()
  domain: string[];
  @IsArray()
  webPages: string[];
}
