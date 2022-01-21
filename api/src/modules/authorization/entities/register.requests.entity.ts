import * as bcrypt from 'bcrypt';
import * as moment from 'moment-timezone';
import { Constants } from '../../../support/constants';
import BaseEntity from '../../core/entities/base.entity';
import { Entity, Column, CreateDateColumn, BeforeInsert } from 'typeorm';

/**
 * RegisterRequests
 * Register requests entity.
 *
 * @extends BaseEntity
 * @table register_requests

 */
@Entity('register_requests')
export class RegisterRequests extends BaseEntity {
  @Column()
  name_and_surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

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

  /**
   * Method to transform password to hash.
   * Fired before insert new record to database.
   */
  @BeforeInsert()
  async transformPasswordToHash() {
    this.password = await bcrypt.hash(this.password, Constants.PASSWORD_SALT);
  }
}
