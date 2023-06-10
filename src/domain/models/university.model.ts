import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity({ name: 'tb_universities' })
export class University {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  @Column({ nullable: false })
  name: string;

  @Column({ name: 'state_province', nullable: true })
  stateProvince: string;

  @Column({ name: 'country', nullable: true })
  country: string;

  @PrimaryColumn()
  @Column({ name: 'country_code', nullable: true, length: 3 })
  countryCode: string;

  @Column({ type: 'text', array: true })
  domain: string[];

  @Column({ type: 'text', array: true, name: 'web_pages' })
  webPages: string[];

  @UpdateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
