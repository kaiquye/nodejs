import { validateOrReject } from "class-validator";

export abstract class DtoAdapter {
  async isValid() {
    await validateOrReject(this);
  }
}
