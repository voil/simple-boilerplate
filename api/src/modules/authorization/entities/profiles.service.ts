import { Repository } from 'typeorm';
import { Profiles } from './profiles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hNormalizeString } from '../../../support/helpers';
import { BaseService } from '../../core/entities/base.service';
import { ProfilesTypeInterface } from '../../../support/interfaces';

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
   * @return void
   */
  public getList(): void {
    // ...
  }

  /**
   * Method to create new profile.
   * @params ProfilesTypeInterface params
   * @return Promise<Profiles>
   */
  public async createProfile(params: ProfilesTypeInterface): Promise<Profiles> {
    const profile = Object.assign(new Profiles(), params, {
      is_active: true,
      can_delete: false,
      lable: hNormalizeString(params.name),
    });
    return await this.profilesRepository.save(profile);
  }
}
