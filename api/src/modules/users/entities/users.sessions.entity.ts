import { Users } from './users.entity'; 
import { UsersAccounts } from './users.accounts.entity';
import BaseEntity from '../../core/entities/base.entity';
import {
  Entity,
  JoinColumn,
  OneToOne,
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
    account => account.session,
  )
  @JoinColumn({ name: 'fk_user_account_id' })
  account: UsersAccounts

  @OneToOne(
    () => Users,
    user => user.session,
  )
  @JoinColumn({ name: 'fk_user_id' })
  user: Users
}
