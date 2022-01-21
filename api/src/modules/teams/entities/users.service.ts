import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, ObjectLiteral } from 'typeorm';

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
   * Method to get users list.
   * @params ObjectLiteral where
   * @return Promise<Array<Users> | Array<void>>
   */
  public async getList(
    where: ObjectLiteral = {},
  ): Promise<Array<Users> | Array<void>> {
    return await this.usersRepository.find({
      where: {
        is_active: true,
        deleted_at: IsNull(),
        ...where,
      },
      relations: ['account', 'profile'],
    });
  }
}
