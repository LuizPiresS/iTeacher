import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone?: string | null;

  @Column({ name: 'data_of_birth', nullable: true })
  dateOfBirth?: string | null;

  @Column({ nullable: true })
  photo?: string | null;

  @Column({ name: 'address_street', nullable: true })
  addressStreet?: string | null;

  @Column({ name: 'address_city', nullable: true })
  addressCity?: string | null;

  @Column({ name: 'address_state', nullable: true })
  addressState?: string | null;

  @Column({ name: 'address_zipcode', nullable: true })
  addressZipcode?: string | null;

  @Column({ name: 'address_country', nullable: true })
  addressCountry?: string | null;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
