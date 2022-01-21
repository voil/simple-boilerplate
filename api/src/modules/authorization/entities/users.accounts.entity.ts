import { Users } from './users.entity';
import { Teams } from './teams.entity';
import { Profiles } from './profiles.entity';
import { UsersSessions } from './users.sessions.entity';
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
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
    () => Users,
    user => user.account,
  )
  users: Users[];

  @OneToMany(
    () => Teams,
    team => team.account,
  )
  teams: Teams[];

  @OneToMany(
    () => Profiles,
    profile => profile.account,
  )
  profiles: Profiles[];
}
