import Command, { CommandInterface } from '@/services/cqrs/command';

/**
 * @interface {LogoutFromPlatformCommandInterface}
 */
export interface LogoutFromPlatformCommandInterface {}

/**
 * LogoutFromPlatformCommand
 * Logout from platform command.
 *
 * @extends {Command}
 * @implements {LogoutFromPlatformCommandInterface}
 */
export default class LogoutFromPlatformCommand extends Command
  implements LogoutFromPlatformCommandInterface {
    /**
     * @var {String}
     */
    public handler = 'authorization';
}
