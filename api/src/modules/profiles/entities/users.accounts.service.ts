import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersAccounts } from './users.accounts.entity';

/**
 * UsersAccountsService
 * Users accounts serivce.
 *

 */
export class UsersAccountsService {
  /**
   * Constructor of class.
   * @params Repository<UsersAccounts> usersAccountsRepository
   */
  constructor(
    @InjectRepository(UsersAccounts)
    private usersAccountsRepository: Repository<UsersAccounts>,
  ) {}

  /**
   * Method for get user accounts list.
   * @return Promise<Array<UsersAccounts>|null>
   */
  public async getList(): Promise<Array<UsersAccounts> | null> {
    return await this.usersAccountsRepository.find();
  }

  /**
   * Method to create new account for user.
   * @return Promise<UsersAccounts>
   */
  public async createUserAccount(): Promise<UsersAccounts> {
    return await this.usersAccountsRepository.save(new UsersAccounts());
  }
}
