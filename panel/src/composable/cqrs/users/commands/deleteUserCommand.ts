import Command from '@/services/cqrs/command';

/**
 * @interface {LoginToPlatformCommandInterface}
 */
export interface DeleteUserCommandInterface {
  records: string[];
}

/**
 * DeleteUserCommand
 * Login to platform command.
 *
 * @extends {Command}
 * @implements {DeleteUserCommandInterface}
 */
export default class DeleteUserCommand extends Command
  implements DeleteUserCommandInterface {
    /**
     * @var {String}
     */
    public handler = 'users';

    /**
     * @var {String}
     */
    public records: string[];

    /**
     * Constructor of class.
     * @param {String} email
     */
    constructor(records: string[]) {
      super();

      this.records = records;
    }
}
