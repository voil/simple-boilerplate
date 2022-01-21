import { Teams } from './teams.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { BaseService } from '../../core/entities/base.service';

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
      order: {
        id: 'DESC',
      },
    });
  }
}
