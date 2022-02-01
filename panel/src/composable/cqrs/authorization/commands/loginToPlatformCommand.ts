import Command, { CommandInterface } from '@/services/cqrs/command';

export interface LoginToPlatformCommandInterface {
  email: string;
  password: string;
}

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
