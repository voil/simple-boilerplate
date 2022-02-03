import {
  ref,
  Ref,
} from 'vue';

/**
 * @var {PayloadParametersType<T>}
 */
export type PayloadParametersType<T> = {
  readonly [K in keyof T]: T[K];
}

/**
 * @var {StateMachineInterface}
 */
interface StateMachineInterface {
  addState<T>(name: string, handler?: (payload: PayloadParametersType<T>) => Promise<void>): void;
  setState<T>(name: string, payload: PayloadParametersType<T>): Promise<void>;
  getCurrentState(): string;
}

/**
 * @var {StateListsType}
 */
type StateListsType = {
  [name: string]: ((payload: any) => Promise<void>) | undefined;
};

/**
 * StateMachineService
 * State machine for buissnes logic platform.
 *
 * @implements StateMachineInterface
 */
export default class StateMachineService implements StateMachineInterface {
  /**
   * @var {String}
   */
  private currentState: Ref<string>;

  /**
   * @var {StateListsType}
   */
  private statesList: StateListsType = {};

  /**
   * Constructor of class.
   * @param {String} initialState
   */
  constructor(initialState = 'default') {
    this.currentState = ref<string>(initialState);
  }

  /**
   * Method to add state for machine.
   * @param {String} name
   * @param {Function} handler
   */
  public addState<T>(
    name: string,
    handler?: (payload: PayloadParametersType<T>) => Promise<void>,
  ): void {
    this.statesList[name] = handler;
  }

  /**
   * Method to set state for current machine.
   * @param {String} name
   */
  public async setState<T>(name: string, payload?: PayloadParametersType<T>): Promise<void> {
    if (!Object.keys(this.statesList).includes(name)) {
      throw new Error(`State "${name}" not exist in machine.`);
    }
    this.currentState.value = name;
    const handler = this.statesList[name];
    if (handler) {
      return await handler(payload);
    }
  }

  /**
   * Method to get current state.
   * @returns {String}
   */
  public getCurrentState(): string {
    return this.currentState.value;
  }
}
