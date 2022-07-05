import { CommandType } from '@/services/cqrs/command';
import { CommandHandlerInterface } from '@/services/cqrs/commandHandler';
import TeamsListStateMachine from '@/composable/store/machines/teamsListStateMachine';
import { DeleteTeamCommandInterface } from './DeleteTeamCommand';

/**
 * DeleteTeamCommandHandler
 * Handler to execute delete team command.
 *
 * @implements {CommandHandlerInterface}
 */
export default class DeleteTeamCommandHandler implements CommandHandlerInterface {
  /**
   * @var {String}
   */
  protected query = `
    mutation DeleteTeam($params: DeleteTeamArgs!) {
      deleteTeam(params: $params) {
        total
      }
    }
  `;

  /**
   * Method to execute command.
   * @param {CommandType<DeleteTeamCommandInterface>} command
   * @return {Promise<void>}
   */
  public async execute(command: CommandType<DeleteTeamCommandInterface>): Promise<any> {
    try {
      const ApolloService = (await import('@/services/apolloService')).default;
      await ApolloService.mutation(this.query, {
        params: {
          records: command.records,
        },
      });
      TeamsListStateMachine.setState('successDelete');
    } catch (error) {
      console.log(error);
      TeamsListStateMachine.setState('errorDelete');
    }
  }
}
