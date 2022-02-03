import { CommandType } from '@/services/cqrs/command';
import { CommandHandlerInterface } from '@/services/cqrs/commandHandler';
import LoggedUserStateMachine from '@/composable/store/machines/authorization/loggedUserStateMachine';
import { LogoutFromPlatformCommandInterface } from './logoutFromPlatformCommand';

/**
 * LogoutFromPlatformCommandHandler
 * Handler to execute login to platform command.
 *
 * @implements {CommandHandlerInterface}
 */
export default class LogoutFromPlatformCommandHandler implements CommandHandlerInterface {
  /**
   * @var {String}
   */
  protected query = `
    mutation LogoutFromPlatform {
      logoutFromPlatform {
        total
        record {
          uuid
        }
      }
    }
  `;

  /**
   * Method to execute command.
   * @param {CommandType<LogoutFromPlatformCommandInterface>} command
   * @return {Promise<void>}
   */
  public async execute(command: CommandType<LogoutFromPlatformCommandInterface>): Promise<any> {
    try {
      const ApolloService = (await import('@/services/apolloService')).default;
      await ApolloService.mutation(this.query);
    } catch (error) {
      LoggedUserStateMachine.setState('logout');
    }
  }
}
