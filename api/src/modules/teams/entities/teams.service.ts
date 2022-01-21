import * as moment from 'moment';
import { Teams } from './teams.entity';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { TeamsHasUsers } from './teams.has.users.entity';
import { BaseService } from '../../core/entities/base.service';
import { TeamsTypeInterface } from '../../../support/interfaces';

/**
 * TeamsService
 * Teams service.
 *

 */
export class TeamsService implements BaseService {
  /**
   * Constructor of class.
   * @params Repository<Teams> profilesRepository
   */
  constructor(
    @InjectRepository(Teams)
    private teamsRepository: Repository<Teams>,
    @InjectRepository(TeamsHasUsers)
    private teamsHasUsersRepository: Repository<TeamsHasUsers>
  ) {}

  /**
   * Method for get teams list.
   * @params ObjectLiteral where
   * @return Promise<Array<Teams>|null>
   */
  public async getList(
    where: ObjectLiteral = {},
  ): Promise<Array<Teams> | null> {
    return await this.teamsRepository.find({
      where,
      relations: ['users', 'users.profile'],
      order: {
        id: 'DESC',
      },
    });
  }

  /**
   * Method to create team.
   * @params TeamsTypeInterface params
   * @return Promise<Teams>
   */
  public async createTeam(params: TeamsTypeInterface): Promise<Teams> {
    const profile = Object.assign(new Teams(), params, {
      is_active: true,
    });
    return await this.teamsRepository.save(profile);
  }

  /**
   * Method to update team.
   * @params Teams team
   * @params ObjectLiteral params
   * @return Promise<Teams>
   */
  public async updateTeam(
    team: Teams,
    params: ObjectLiteral = {},
  ): Promise<Teams> {
    delete params.uuid;
    const updatedAt = moment().format('Y-MM-D H:mm:s');
    this.teamsRepository.update(team.id, {
      ...params,
      updated_at: updatedAt,
    });

    params.updated_at = updatedAt;
    return Object.assign(team, { ...params });
  }

  /**
   * Method to delete team.
   * @params String uuid
   * @return Promise<void>
   */
  public async deleteTeam(uuid: string): Promise<void> {
    await this.teamsRepository.update(
      { uuid },
      {
        deleted_at: moment().format('Y-MM-D H:mm:s'),
      },
    );
  }

  /**
   * Method to assign user to team.
   * @params Teams team
   * @params Users user
   * @return Promise<void>
   */
  public async assignUserToTeam(team: Teams, user: Users): Promise<void> {
    const assigned = Object.assign(new TeamsHasUsers(), {
      user: user.id,
      team: team.id
    });
    await this.teamsHasUsersRepository.save(assigned);
  }

  /**
   * Method to unassign user from team.
   * @params Teams team
   * @params Users user
   * @return Promise<void>
   */
  public async unAssignUserToTeam(team: Teams, user: Users): Promise<void> {
    await this.teamsHasUsersRepository.delete({
      user,
      team
    });
  }
}
