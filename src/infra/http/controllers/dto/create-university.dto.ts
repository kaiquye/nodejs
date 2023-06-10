import { DtoAdapter } from '../../../../domain/adapters/dto-adapter';
import { IsArray, IsString, Length } from 'class-validator';

export class CreateUniversityDto extends DtoAdapter {
  // constructor({ name, stateProvince, country, countryCode, domain, webPages }) {
  //   super();
  //   this.name = name;
  //   this.stateProvince = stateProvince;
  //   this.country = country;
  //   this.countryCode = countryCode;
  //   this.domain = domain;
  //   this.webPages = webPages;
  // }

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
