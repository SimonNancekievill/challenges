import { Exclude } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  @MaxLength(120)
  username!: string;

  @Exclude()
  @Column()
  passwordHash!: string;
}
