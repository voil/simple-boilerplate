import { CommandType } from '@/services/cqrs/command';
import { CommandHandlerInterface } from '@/services/cqrs/commandHandler';
import ProfilesListStateMachine from '@/composable/store/machines/profilesListStateMachine';
import { DeleteProfileCommandInterface } from './DeleteProfileCommand';

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
    mutation DeleteProfile($params: DeleteProfileArgs!) {
      deleteProfile(params: $params) {
        total
      }
    }
  `;

  /**
   * Method to execute command.
   * @param {CommandType<DeleteProfileCommandInterface>} command
   * @return {Promise<void>}
   */
  public async execute(command: CommandType<DeleteProfileCommandInterface>): Promise<any> {
    try {
      const ApolloService = (await import('@/services/apolloService')).default;
      await ApolloService.mutation(this.query, {
        params: {
          records: command.records,
        },
      });
      ProfilesListStateMachine.setState('successDelete');
    } catch (error) {
      console.log(error);
      ProfilesListStateMachine.setState('errorDelete');
    }
  }
}