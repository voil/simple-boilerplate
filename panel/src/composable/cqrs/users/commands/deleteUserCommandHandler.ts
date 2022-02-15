import { CommandType } from '@/services/cqrs/command';
import { CommandHandlerInterface } from '@/services/cqrs/commandHandler';
import UserListStateMachines from '@/composable/store/machines/users/userListStateMachines';
import { DeleteUserCommandInterface } from './deleteUserCommand';

/**
 * LoginToPlatformCommandHandler
 * Handler to execute login to platform command.
 *
 * @implements {CommandHandlerInterface}
 */
export default class LoginToPlatformCommandHandler implements CommandHandlerInterface {
  /**
   * @var {String}
   */
  protected query = `
    mutation DeleteUser($params: DeleteUserArgs!) {
      deleteUser(params: $params) {
        total
      }
    }
  `;

  /**
   * Method to execute command.
   * @param {CommandType<DeleteUserCommandInterface>} command
   * @return {Promise<void>}
   */
  public async execute(command: CommandType<DeleteUserCommandInterface>): Promise<any> {
    try {
      const ApolloService = (await import('@/services/apolloService')).default;
      await ApolloService.mutation(this.query, {
        params: {
          records: command.records,
        },
      });
      UserListStateMachines.setState('successDelete');
    } catch (error) {
      UserListStateMachines.setState('errorDelete');
    }
  }
}
