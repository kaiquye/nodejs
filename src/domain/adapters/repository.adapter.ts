import { Repository } from "typeorm";
import { AppDataSourceReading } from "../../infra/database/reading";
import { AppDataSourceWriting } from "../../infra/database/writing";

export abstract class RepositoryAdapter<Model> {
  protected readonly Writing: Repository<Model>;
  protected readonly Reading: Repository<Model>;
  protected constructor(Model) {
    this.Reading = AppDataSourceReading.getRepository(Model);
    this.Writing = AppDataSourceWriting.getRepository(Model);
  }
}
