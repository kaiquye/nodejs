import { University } from '../../../../domain/models/university.model';
import { IUniversityRepository } from '../../../../application/university/repository/university-repository.interface';
import { FindOptionsWhere } from 'typeorm';

export class UniversityRepository extends IUniversityRepository {
  async exists(where: FindOptionsWhere<University>): Promise<University> {
    return this.Reading.findOne({ where });
  }

  async create(data: University): Promise<University> {
    return this.Writing.create(data);
  }

  async findAllByCountry(
    country: string,
    page: number,
    perPage: number,
  ): Promise<University[]> {
    const offset = page * perPage;

    return this.Reading.find({
      where: {
        country,
      },
      skip: offset,
      take: perPage,
    });
  }
}
