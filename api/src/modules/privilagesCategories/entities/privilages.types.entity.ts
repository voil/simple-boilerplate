import BaseEntity from '../../core/entities/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PrivilageCategorie } from './privilages.categories.entity';

/**
 * PrivilageType
 * Privilage type entity.
 *
 * @extends BaseEntity
 * @table privilages_types

 */
@Entity('privilages_types')
export class PrivilageType extends BaseEntity {
  @Column()
  description: string;

  @Column()
  label: string;

  @Column()
  is_active: boolean;

  @ManyToOne(
    () => PrivilageCategorie,
    category => category.types,
  )
  @JoinColumn({ name: 'fk_privilage_categorie_id' })
  category: PrivilageCategorie;
}
