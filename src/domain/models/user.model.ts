import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'tb_User' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  password: string;
  @UpdateDateColumn()
  @Exclude()
  created_at: Date;
  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
