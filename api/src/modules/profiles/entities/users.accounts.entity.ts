import { Users } from './users.entity';
import { Teams } from './teams.entity';
import { Profiles } from './profiles.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import BaseEntity from '../../core/entities/base.entity';

/**
 * UsersAccounts
 * User accoutns entity.
 *
 * @extends BaseEntity
 * @table users_accounts

 */
@Entity('users_accounts')
export class UsersAccounts extends BaseEntity {
  @Column()
  is_active: boolean;

  @OneToMany(
    () => Profiles,
    profile => profile.account,
  )
  profiles: Profiles[];

  @OneToMany(
    () => Users,
    user => user.account,
  )
  users: Users[];

  @OneToMany(
    () => Teams,
    team => team.account,
  )
  teams: Teams[];
}
