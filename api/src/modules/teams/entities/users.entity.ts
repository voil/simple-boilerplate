import * as moment from 'moment-timezone';
import BaseEntity from '../../core/entities/base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinTable,
  JoinColumn,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import { Teams } from './teams.entity';
import { Profiles } from './profiles.entity';
import { UsersAccounts } from './users.accounts.entity';

/**
 * Users
 * Users entity.
 *
 * @extends BaseEntity
 * @table users

 */
@Entity('users')
export class Users extends BaseEntity {
  @Column()
  name_and_surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  is_active: boolean;

  @ManyToOne(
    () => Profiles,
    profile => profile.users,
  )
  @JoinColumn({ name: 'fk_profile_id' })
  profile: Profiles;

  @ManyToOne(
    () => UsersAccounts,
    account => account.users,
  )
  @JoinColumn({ name: 'fk_user_account_id' })
  account: UsersAccounts;

  @ManyToMany(() => Users)
  @JoinTable({
    name: 'teams_has_users',
    joinColumn: { name: 'fk_user_id' },
    inverseJoinColumn: { name: 'fk_team_id' },
  })
  teams: Teams[];

  @CreateDateColumn({
    comment: 'Kiedy dany wpis został usunięty.',
    transformer: {
      from: value => {
        return value
          ? moment(value)
              .tz('Europe/Warsaw')
              .format('YYYY-MM-DD HH:mm:ss')
          : null;
      },
      to: value => value,
    },
  })
  deleted_at: string;
}
