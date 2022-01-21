import { Users } from './users.entity';
import { UsersAccounts } from './users.accounts.entity';
import BaseEntity from '../../core/entities/base.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

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

  @ManyToOne(
    () => UsersAccounts,
    account => account.profiles,
  )
  @JoinColumn({ name: 'fk_user_account_id' })
  account: UsersAccounts;

  @OneToMany(
    () => Users,
    user => user.profile,
  )
  users: Users[];
}
