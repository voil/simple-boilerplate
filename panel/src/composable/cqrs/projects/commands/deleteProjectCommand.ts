import Command from '@/services/cqrs/command';

/**
 * @interface {DeleteProjectCommandInterface}
 */
export interface DeleteProjectCommandInterface {
  records: string[];
}

/**
 * DeleteProjectCommand
 * Delete project command.
 *
 * @extends {Command}
 * @implements {DeleteProjectCommandInterface}
 */
export default class DeleteProjectCommand extends Command
  implements DeleteProjectCommandInterface {
    /**
     * @var {String}
     */
    public handler = 'projects';

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
