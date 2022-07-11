import { CommandType } from '@/services/cqrs/command';
import { CommandHandlerInterface } from '@/services/cqrs/commandHandler';
import ProjectsListStateMachine from '@/composable/store/machines/projectsListStateMachine';
import { DeleteProjectCommandInterface } from './DeleteProjectCommand';

/**
 * DeleteProjectCommandHandler
 * Handler to execute delete project command.
 *
 * @implements {CommandHandlerInterface}
 */
export default class DeleteProjectCommandHandler implements CommandHandlerInterface {
  /**
   * @var {String}
   */
  protected query = `
    mutation DeleteProject($params: DeleteProjectArgs!) {
      deleteProject(params: $params) {
        total
      }
    }
  `;

  /**
   * Method to execute command.
   * @param {CommandType<DeleteProjectCommandInterface>} command
   * @return {Promise<void>}
   */
  public async execute(command: CommandType<DeleteProjectCommandInterface>): Promise<void> {
    try {
      const ApolloService = (await import('@/services/apolloService')).default;
      await ApolloService.mutation(this.query, {
        params: {
          records: command.records,
        },
      });
      ProjectsListStateMachine.setState('successDelete');
    } catch (error) {
      console.log(error);
      ProjectsListStateMachine.setState('errorDelete');
    }
  }
}
