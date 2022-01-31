/**
 * Interface for class Command.
 *
 * @export
 * @interface CommandInterface
 */
export interface CommandInterface {
  getHandlerName(): string;
}

/**
 * Abstract class for commands.
 *
 * @abstract
 * @class Command
 * @implements {CommandInterface}
 */
abstract class Command implements CommandInterface {
  /**
   * Variable to store name of module.
   *
   * @type {String}
   * @memberof Command
   */
  handler = '';

  /**
   * Get name of module.
   *
   * @returns {String}
   * @memberof Command
   */
  public getHandlerName(): string {
    return this.handler;
  }
}

export default Command;
