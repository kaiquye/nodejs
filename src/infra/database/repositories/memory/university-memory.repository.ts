import { IUniversityRepository } from '../../../../application/university/repository/university-repository.interface';
import { University } from '../../../../domain/models/university.model';
import { FindOptionsWhere } from 'typeorm';

export class UniversityMemoryRepository extends IUniversityRepository {
  private database: University[] = [];
  async create(data: University): Promise<University> {
    this.database.push(data);
    return Promise.resolve(data);
  }

  exists(data: FindOptionsWhere<University>): Promise<University> {
    const result = this.database.find(
      (university) =>
        university.country == data.country && university.name == data.name,
    );

    return Promise.resolve(result);
  }

  findAllByCountry(
    country: string,
    page: number,
    perPage: number,
  ): Promise<University[]> {
    return Promise.resolve([]);
  }

  delete(university: University): Promise<University> {
    const index = this.database.indexOf(university);
    if (index) {
      this.database.slice(index, 1);
    }

    return Promise.resolve(university);
  }
}
