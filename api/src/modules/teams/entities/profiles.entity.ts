import { Users } from './users.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import BaseEntity from '../../core/entities/base.entity';

/**
 * Profiles
 * Profiles entity.
 *
 * @extends BaseEntity
 * @table profiles

 */
@Entity('profiles')
export class Profiles extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  label: string;

  @Column()
  privilages: string;

  @Column()
  is_active: boolean;

  @Column()
  can_delete: boolean;

  @OneToMany(
    () => Users,
    user => user.profile,
  )
  users: Users[];
}
