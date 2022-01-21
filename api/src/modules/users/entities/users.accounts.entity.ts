import { Users } from './users.entity';
import { Teams } from './teams.entity';
import { Profiles } from './profiles.entity';
import BaseEntity from '../../core/entities/base.entity';
import { UsersSessions } from '../entities/users.sessions.entity';
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';

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
    () => Profiles,
    profile => profile.account,
  )
  profiles: Profiles[];

  @OneToMany(
    () => Teams,
    team => team.account,
  )
  teams: Teams[];

  @OneToOne(
    () => UsersSessions,
    session => session.account,
  )
  @JoinColumn({ name: 'fk_user_account_id' })
  session: UsersSessions;
}
