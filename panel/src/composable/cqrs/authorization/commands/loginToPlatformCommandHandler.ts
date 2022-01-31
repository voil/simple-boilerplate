import { CommandHandlerInterface } from '@/services/cqrs/commandHandler';
import { LoginToPlatformCommandInterface } from './loginToPlatformCommand';

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

  public async execute(command: LoginToPlatformCommandInterface): Promise<any> {
    const ApolloService = (await import('@/services/apolloService')).default;

    ApolloService.mutation(this.query, {
      email: 'admin@app.com',
      password: 'testtest1A',
    });
  }
}
