import { container } from "tsyringe";
import { UniversityMemoryRepository } from "../infra/database/repositories/memory/university-memory.repository";

container.registerSingleton(
  "university-repository",
  UniversityMemoryRepository
);
