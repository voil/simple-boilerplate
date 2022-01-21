import * as moment from 'moment-timezone';
import { Teams } from './teams.entity';
import { UsersAccounts } from './users.accounts.entity';
import BaseEntity from '../../core/entities/base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * Projects
 * Projects entity.
 *
 * @extends BaseEntity
 * @table teams

 */
@Entity('projects')
export class Projects extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  is_active: boolean;

  @Column()
  is_global: boolean;

  @ManyToOne(
    () => UsersAccounts,
    account => account.projects,
  )
  @JoinColumn({ name: 'fk_user_account_id' })
  account: UsersAccounts;

  @ManyToOne(
    () => Teams,
    team => team.projects,
  )
  @JoinColumn({ name: 'fk_team_id' })
  team: Teams;

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
