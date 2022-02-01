import { CommandHandlerInterface } from '@/services/cqrs/commandHandler';
import { CommandType } from '@/services/cqrs/command';
import { LoginToPlatformCommandInterface } from './loginToPlatformCommand';
import LoginFormStateMachine from '@/composable/store/machines/authorization/loginFormStateMachine';

export default class LoginToPlatformCommandHandler implements CommandHandlerInterface {
  /**
   * @var {String}
   */
  protected query = `
    mutation LoginToPlatform($email: String!, $password: String!) {
      loginToPlatform(params: {
        email: $email,
        password: $password
      }) {
        state
      }
    }
  `;

  public async execute(command: CommandType<LoginToPlatformCommandInterface>): Promise<any> {
    try {
      const ApolloService = (await import('@/services/apolloService')).default;
      await ApolloService.mutation(this.query, {
        email: command.email,
        password: command.password,
      });
      LoginFormStateMachine.setState('success');
    }
    catch (error) {
      LoginFormStateMachine.setState('error');
    }
  }
}
