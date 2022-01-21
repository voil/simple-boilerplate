import BaseEntity from '../../core/entities/base.entity';
import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../entities/users.entity';
import { Teams } from '../entities/teams.entity';

/**
 * TeamsHasUsers
 * teams has users entity.
 *
 * @extends BaseEntity
 * @table teams_has_users

 */
@Entity('teams_has_users')
export class TeamsHasUsers extends BaseEntity {
  @ManyToOne(
    () => Teams,
    Team => Team.users,
  )
  @JoinColumn({ name: 'fk_team_id' })
  public team!: Teams;

  @ManyToOne(
    () => Users,
    user => user.teams,
  )
  @JoinColumn({ name: 'fk_user_id' })
  public user!: Users;
}
