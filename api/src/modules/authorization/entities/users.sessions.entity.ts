import { Users } from './users.entity'; 
import * as moment from 'moment-timezone';
import { UsersAccounts } from './users.accounts.entity';
import BaseEntity from '../../core/entities/base.entity';
import {
  Entity,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * Users
 * Users entity.
 *
 * @extends BaseEntity
 * @table users

 */
@Entity('users_sessions')
export class UsersSessions extends BaseEntity {
  @OneToOne(
    () => UsersAccounts,
  )
  @JoinColumn({ name: 'fk_user_account_id' })
  account: UsersAccounts

  @OneToOne(
    () => Users,
  )
  @JoinColumn({ name: 'fk_user_id' })
  user: Users

  @CreateDateColumn({
    comment: 'Do kiedy sessja jest aktywna.',
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
  actived_to: string;
}
