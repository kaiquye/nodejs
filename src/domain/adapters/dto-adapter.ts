import { validateOrReject } from 'class-validator';

export abstract class DtoAdapter {
  async isValid() {
    const validatorOptions = {
      whitelist: true,
      forbidNonWhitelisted: true, // N esquecer :  Retorna um erro caso sejam encontradas propriedades não definidas na classe
    };

    await validateOrReject(this, validatorOptions);
  }
}
