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
 * @var {CommandType}
 */
export type CommandType<T> = {
  readonly [K in keyof T]: T[K]
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
   * @return {String}
   */
  public getHandlerName(): string {
    return this.handler;
  }
}

export default Command;
