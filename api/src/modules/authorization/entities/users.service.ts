import * as bcrypt from 'bcrypt';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from '../../../support/constants';
import { Repository, IsNull, ObjectLiteral } from 'typeorm';
import { CreateUserParamsInterface } from '../../../support/interfaces';
import { CustomException } from '../../../support/handlers/custom.handler';

/**
 * UsersService
 * Users serivce.
 *

 */
export class UsersService {
  /**
   * Constructor of class.
   * @params Repository<Users> usersRepository
   */
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  /**
   * Method to change password for user by uuid.
   * @params String uuid
   * @params String password
   * @return Promise<void>
   */
  public async changePasswordForUserByUuid(
    uuid: string,
    password: string,
  ): Promise<void> {
    const user = await this.getUserByParams({ uuid });

    if (!user) {
      throw new CustomException(`User to change password not exists.`);
    }

    user.password = await bcrypt.hash(password, Constants.PASSWORD_SALT);
    await this.usersRepository.save(user);
  }

  /**
   * Method to create new user.
   * @return  Promise<Users>
   */
  public async createUser(params: CreateUserParamsInterface): Promise<Users> {
    return await this.usersRepository.save(Object.assign(new Users(), params));
  }

  /**
   * Method to get user by params.
   * @params ObjectLiteral where
   * @return Promise<Users | null>
   */
  public async getUserByParams(
    where: ObjectLiteral = {},
  ): Promise<Users | null> {
    const record = await this.usersRepository.find({
      where: {
        is_active: true,
        deleted_at: IsNull(),
        ...where,
      },
      relations: ['account', 'profile', 'teams'],
    });

    return record[0] || null;
  }
}
