import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1686440561556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.query(
      `CREATE TABLE tb_User (
              id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
              name VARCHAR(255),
              email VARCHAR(255),
              phone VARCHAR(14),
              password VARCHAR(255),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
