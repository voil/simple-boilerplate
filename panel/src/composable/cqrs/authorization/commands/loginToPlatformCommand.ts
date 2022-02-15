import Command from '@/services/cqrs/command';

/**
 * @interface {LoginToPlatformCommandInterface}
 */
export interface LoginToPlatformCommandInterface {
  email: string;
  password: string;
}

/**
 * LoginToPlatformCommand
 * Login to platform command.
 *
 * @extends {Command}
 * @implements {LoginToPlatformCommandInterface}
 */
export default class LoginToPlatformCommand extends Command
  implements LoginToPlatformCommandInterface {
    /**
     * @var {String}
     */
    public handler = 'authorization';

    /**
     * @var {String}
     */
    public email: string;

    /**
     * @var {String}
     */
    public password: string;

    /**
     * Constructor of class.
     * @param {String} email
     * @param {String} password
     */
    constructor(email: string, password: string) {
      super();

      this.email = email;
      this.password = password;
    }
}
