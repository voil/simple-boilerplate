import Command from '@/services/cqrs/command';

/**
 * @interface {LoginToPlatformCommandInterface}
 */
export interface DeleteTeamCommandInterface {
  records: string[];
}

/**
 * DeleteTeamCommand
 * Delete team command.
 *
 * @extends {Command}
 * @implements {DeleteTeamCommandInterface}
 */
export default class DeleteTeamCommand extends Command
  implements DeleteTeamCommandInterface {
    /**
     * @var {String}
     */
    public handler = 'teams';

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
