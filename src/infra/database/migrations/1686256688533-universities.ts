import { MigrationInterface, QueryRunner } from 'typeorm';
export class Universities1686256688533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.query(
      `CREATE TABLE tb_Universities (
            id UUID DEFAULT uuid_generate_v4(),  
            name VARCHAR(255),
            state_province VARCHAR(255),
            country VARCHAR(255),
            country_code VARCHAR(255),
            domain text ARRAY,
            web_pages text ARRAY,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (name, country_code)
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return null;
  }
}
