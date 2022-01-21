import { Entity, Column, OneToMany } from 'typeorm';
import BaseEntity from '../../core/entities/base.entity';
import { PrivilageType } from './privilages.types.entity';

/**
 * PrivilageCategorie
 * Privilage categorie entity.
 *
 * @extends BaseEntity
 * @table privilages_categories

 */
@Entity('privilages_categories')
export class PrivilageCategorie extends BaseEntity {
  @Column()
  description: string;

  @Column()
  label: string;

  @Column()
  is_active: boolean;

  @OneToMany(
    () => PrivilageType,
    type => type.category,
  )
  types: PrivilageType[];
}
