import { Profiles } from './profiles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { BaseService } from '../../core/entities/base.service';

/**
 * ProfilesService
 * Profiles service.
 *

 */
export class ProfilesService implements BaseService {
  /**
   * Constructor of class.
   * @params Repository<Profiles> profilesRepository
   */
  constructor(
    @InjectRepository(Profiles)
    private profilesRepository: Repository<Profiles>,
  ) {}

  /**
   * Method for get profiles list.
   * @params ObjectLiteral where
   * @return Promise<Array<Profiles>|null>
   */
  public async getList(
    where: ObjectLiteral = {},
  ): Promise<Array<Profiles> | null> {
    return await this.profilesRepository.find({ where });
  }
}
