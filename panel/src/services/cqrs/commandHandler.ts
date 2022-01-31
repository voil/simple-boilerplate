import { CommandInterface } from './command';

export interface CommandHandlerInterface {
  execute(command: CommandInterface): Promise<any>
}
