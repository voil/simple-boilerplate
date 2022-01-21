import * as bcrypt from 'bcrypt';
import { Teams } from './teams.entity';
import * as moment from 'moment-timezone';
import { Constants } from '../../../support/constants';
import { UsersSessions } from './users.sessions.entity';
import { UsersAccounts } from './users.accounts.entity';
import BaseEntity from '../../core/entities/base.entity';
import {
  Entity,
  Column,
  OneToOne,
  JoinTable,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  BeforeInsert,
  CreateDateColumn,
} from 'typeorm';
import { Profiles } from './profiles.entity';

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
    () => UsersAccounts,
    account => account.users,
  )
  @JoinColumn({ name: 'fk_user_account_id' })
  account: UsersAccounts;

  @ManyToOne(
    () => Profiles,
    profile => profile.users,
  )
  @JoinColumn({ name: 'fk_profile_id' })
  profile: Profiles;

  @CreateDateColumn({
    comment: 'Kiedy dany wpis został utworzony.',
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

  @OneToOne(
    () => UsersSessions,
    session => session.user,
  )
  session: UsersSessions

  @ManyToMany(() => Teams)
  @JoinTable({
    name: 'teams_has_users',
    joinColumn: { name: 'fk_user_id' },
    inverseJoinColumn: { name: 'fk_team_id' },
  })
  teams: Teams[];

  /**
   * Method to transform password to hash.
   * Fired before insert new record to database.
   */
  @BeforeInsert()
  async transformPasswordToHash() {
    this.password = await bcrypt.hash(this.password, Constants.PASSWORD_SALT);
  }
}
