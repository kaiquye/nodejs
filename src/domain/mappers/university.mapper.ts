import { CreateUniversityDto } from '../../infra/http/controllers/dto/create-university.dto';
import { University } from '../models/university.model';
import { ICreateUniversityIN } from '../../application/university/interfaces/create-university.interfaces';

class UniversityMapper {
  toDomain(data: CreateUniversityDto | ICreateUniversityIN): University {
    const mapper = new University();
    mapper.name = data.name;
    mapper.domain = data.domain;
    mapper.webPages = data.webPages;
    mapper.countryCode = data.countryCode;
    mapper.country = data.country;
    mapper.stateProvince = data.stateProvince;
    return mapper;
  }

  toView(data: University): Partial<University> {
    delete data.created_at;
    delete data.updated_at;

    return data;
  }
}

export default new UniversityMapper();
