import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectLiteral } from 'typeorm';
import { Constants } from '../../../support/constants';
import { BaseService } from '../../core/entities/base.service';
import { UsersTypeInterface } from '../../../support/interfaces';

/**
 * UsersService
 * Users serivce.
 *

 */
export class UsersService implements BaseService {
  /**
   * Constructor of class.
   * @params Repository<Users> usersRepository
   */
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  /**
   * Method for get profiles list.
   * @params ObjectLiteral where
   * @return Promise<Array<Profiles>|null>
   */
  public async getList(
    where: ObjectLiteral = {},
  ): Promise<Array<Users> | null> {
    return await this.usersRepository.find({
      where,
      relations: ['profile', 'teams'],
      order: {
        id: 'DESC',
      },
    });
  }

  /**
   * Method to create user.
   * @params UsersTypeInterface params
   * @return Promise<Users>
   */
  public async createUser(params: UsersTypeInterface): Promise<Users> {
    const profile = Object.assign(new Users(), params, {
      is_active: true,
    });
    return await this.usersRepository.save(profile);
  }

  /**
   * Method to delete user.
   * @params String uuid
   * @return Promise<void>
   */
  public async deleteUser(uuid: string): Promise<void> {
    await this.usersRepository.update(
      { uuid },
      {
        deleted_at: moment().format('Y-MM-D H:mm:s'),
      },
    );
  }

  /**
   * Method to update user.
   * @params Users user
   * @params ObjectLiteral params
   * @return Promise<Users>
   */
  public async updateUser(
    user: Users,
    params: ObjectLiteral = {},
  ): Promise<Users> {
    if (params.password && params.password.trim() !== '') {
      params.password = await bcrypt.hash(
        params.password,
        Constants.PASSWORD_SALT,
      );
    } else {
      delete params.password;
    }

    const updatedAt = moment().format('Y-MM-D H:mm:s');
    await this.usersRepository.update(user.id, {
      ...params,
      updated_at: updatedAt,
    });

    params.updated_at = updatedAt;
    return Object.assign(user, { ...params });
  }
}
