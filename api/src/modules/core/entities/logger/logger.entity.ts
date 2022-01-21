import BaseEntity from '../base.entity';
import { Entity, Column } from 'typeorm';

/**
 * Logger
 * logger entity.
 *
 * @extends BaseEntity
 * @table logs

 */
@Entity('logs')
export class Logger extends BaseEntity {
  @Column()
  message: string;
}
