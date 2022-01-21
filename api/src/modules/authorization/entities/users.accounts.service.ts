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
   * Method to create new account for user.
   * @return Promise<UsersAccounts>
   */
  public async createUserAccount(): Promise<UsersAccounts> {
    return await this.usersAccountsRepository.save(new UsersAccounts());
  }
}
