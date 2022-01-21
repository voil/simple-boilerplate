import * as moment from 'moment';
import { Profiles } from './profiles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
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
   * @params ObjectLiteral where
   * @return Promise<Array<Profiles>|null>
   */
  public async getList(
    where: ObjectLiteral = {},
  ): Promise<Array<Profiles> | null> {
    return await this.profilesRepository.find({
      where,
      order: {
        id: 'DESC',
      },
      relations: ['account'],
    });
  }

  /**
   * Method to create new profile.
   * @params ProfilesTypeInterface params
   * @return Promise<Profiles>
   */
  public async createProfile(params: ProfilesTypeInterface): Promise<Profiles> {
    const profile = Object.assign(new Profiles(), params, {
      is_active: true,
      can_delete: true,
      lable: hNormalizeString(params.name),
    });
    return await this.profilesRepository.save(profile);
  }

  /**
   * Method to delete profile.
   * @params String uuid
   * @return Promise<void>
   */
  public async deleteProfile(uuid: string): Promise<void> {
    await this.profilesRepository.delete({ uuid });
  }

  /**
   * Method to update profile.
   * @params Profiles profile
   * @params ObjectLiteral params
   * @return Promise<Profiles>
   */
  public async updateProfile(
    profile: Profiles,
    params: ObjectLiteral = {},
  ): Promise<Profiles> {
    delete params.uuid;
    const updatedAt = moment().format('Y-MM-D H:mm:s');
    this.profilesRepository.update(profile.id, {
      ...params,
      updated_at: updatedAt,
    });

    params.updated_at = updatedAt;
    return Object.assign(profile, { ...params });
  }
}
