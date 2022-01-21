import {
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as moment from 'moment-timezone';
import { BaseEntityInterface } from '../../../support/interfaces';

/**
 * BaseEntity
 * Base entity.
 *

 */
export default abstract class BaseEntity implements BaseEntityInterface {
  @PrimaryGeneratedColumn({
    comment: 'Unikalna zmienna id.',
  })
  id?: number|string;

  @Column({
    type: 'uuid',
    comment: 'Unikalna zmienna uuid.',
  })
  @Generated('uuid')
  uuid?: string | null;

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
  created_at: string;

  @UpdateDateColumn({
    comment: 'Kiedy dany wpis został edytowany.',
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
  updated_at: string;
}
