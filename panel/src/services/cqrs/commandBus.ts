import { CommandInterface } from './command';
import { CommandHandlerInterface } from './commandHandler';

/**
 * Main class of CommandBus.
 * @class CommandBus
 */
export default class CommandBus {
  /**
   * Method to handle command action.
   * @param {CommandInterface} command
   * @return {Promise<void>}
   */
  public static async handle(command: CommandInterface): Promise<void> {
    const handler = await this.getHandlerForCommnad(command);
    await handler.execute(command);
  }

  /**
   * Method to get dynamic handler for command.
   * @param {CommandInterface} command
   * @returns {Promise<CommandHandlerInterface>}
   */
  private static async getHandlerForCommnad(
    command: CommandInterface,
  ): Promise<CommandHandlerInterface> {
    try {
      const { hFirstToLower } = await import('@/utils/helpers');
      const handler = await import(`@/composable/cqrs/${command.getHandlerName()}/commands/${hFirstToLower(command.constructor.name)}Handler`);
      return new handler.default();
    } catch (e) {
      throw new Error('The specified handler does not exist.');
    }
  }
}
