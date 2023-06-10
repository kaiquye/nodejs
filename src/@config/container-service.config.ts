import { container } from "tsyringe";
import { CreateUniversityUseCase } from "../application/university/create-university.use-case";

container.registerSingleton(
  "create-university-use-case",
  CreateUniversityUseCase
);
