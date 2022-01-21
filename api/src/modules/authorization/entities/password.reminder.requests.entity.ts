import { Users } from './users.entity';
import * as moment from 'moment-timezone';
import BaseEntity from '../../core/entities/base.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

/**
 * PasswordReminderRequests
 * Password reminder requests entity.
 *
 * @extends BaseEntity
 * @table password_reminder_requests
 */
@Entity('password_reminder_requests')
export class PasswordReminderRequests extends BaseEntity {
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
  actived_at: string;

  @Column()
  is_active: boolean;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'fk_user_id' })
  user: Users;
}
