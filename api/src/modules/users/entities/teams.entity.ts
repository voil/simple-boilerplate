import { Users } from './users.entity';
import * as moment from 'moment-timezone';
import { UsersAccounts } from './users.accounts.entity';
import BaseEntity from '../../core/entities/base.entity';
import {
  Entity,
  Column,
  JoinTable,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';

/**
 * Teams
 * Teams entity.
 *
 * @extends BaseEntity
 * @table teams

 */
@Entity('teams')
export class Teams extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  is_active: boolean;

  @ManyToOne(
    () => UsersAccounts,
    account => account.teams,
  )
  @JoinColumn({ name: 'fk_user_account_id' })
  account: UsersAccounts;

  @ManyToMany(() => Users)
  @JoinTable({
    name: 'teams_has_users',
    joinColumn: { name: 'id_team_fk' },
    inverseJoinColumn: { name: 'id_user_fk' },
  })
  users: Users[];

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
