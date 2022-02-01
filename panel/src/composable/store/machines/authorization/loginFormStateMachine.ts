import CommandBus from '@/services/cqrs/commandBus';
import StateMachineService, { PayloadParametersType } from "@/services/stateMachineService";
import LoginToPlatformCommand from '@/composable/cqrs/authorization/commands/loginToPlatformCommand';

const machine = new StateMachineService('default');

/**
 * @var {LoginFormParamsType}
 */
export type LoginFormParamsType = {
  email: string;
  password: string;
}

/**
 * Main state for machine.
 */
machine.addState('default');

/**
 * State for pending and submit form (login user to platform).
 */
machine.addState<LoginFormParamsType>('pending',
  async (payload: PayloadParametersType<LoginFormParamsType>) => await CommandBus.handle(new LoginToPlatformCommand(
    payload.email,
    payload.password,
)));

/**
 * State for show success when login is correct.
 */
machine.addState('success');

/**
 * State for show error when login is incorrect.
 */
machine.addState('error', async () => {
  setTimeout(() => machine.setState('default'), 3500);
});

export default machine;