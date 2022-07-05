import Command from '@/services/cqrs/command';

/**
 * @interface {LoginToPlatformCommandInterface}
 */
export interface DeleteProfileCommandInterface {
  records: string[];
}

/**
 * DeleteProfileCommand
 * Login to platform command.
 *
 * @extends {Command}
 * @implements {DeleteProfileCommandInterface}
 */
export default class DeleteProfileCommand extends Command
  implements DeleteProfileCommandInterface {
    /**
     * @var {String}
     */
    public handler = 'profiles';

    /**
     * @var {String}
     */
    public records: string[];

    /**
     * Constructor of class.
     */
    constructor(records: string[]) {
      super();

      this.records = records;
    }
}