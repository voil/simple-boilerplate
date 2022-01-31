import Command from '@/services/cqrs/command';

export interface LoginToPlatformCommandInterface {}

export default class LoginToPlatformCommand extends Command
  implements LoginToPlatformCommandInterface {
    handler = 'authorization';
}
