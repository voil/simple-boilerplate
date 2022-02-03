import { CommandType } from './command';

export interface CommandHandlerInterface {
  execute(command: CommandType<any>): Promise<any>
}
