import { reactive } from 'vue';

/**
 * @var {PayloadStoreType<T>}
 */
export type PayloadStoreType<T> = {
  readonly [K in keyof T]: T[K];
}

/**
 * @interface {StoreInterface}
 */
interface StoreInterface {
  addModule(name: string, module: Object): void;
  commit<T>(name: string, payload: PayloadStoreType<T | any> | null): void
  get<T>(name: string): PayloadStoreType<T | any> | null
}

/**
 * Store
 * Store to handle all reactive elements.
 * @implements {StoreInterface}
 */
class Store implements StoreInterface {
  /**
   * @var {Any}
   */
  private modules: any = reactive({});

  /**
   * Method to add module to store.
   * @param {String} name
   * @param {Object} module
   */
  public addModule(name: string, module: Object): void {
    this.modules[name] = module;
  }

  /**
   * Method to commit changes to store.
   * @param {String} name
   * @param {PayloadStoreType<T>} payload
   */
  public commit<T>(name: string, payload: PayloadStoreType<T | any> | null): void {
    if (!this.modules[name]) {
      throw new Error(`Store ${name} not exists.`);
    } else {
      this.modules[name] = payload ? {
        ...this.modules[name],
        ...payload,
      } : {};
    }
  }

  /**
   * Method to get element from store.
   * @param {String} name
   * @return {PayloadStoreType<T | any> | null}
   */
  public get<T>(name: string): PayloadStoreType<T | any> | null {
    if (!this.modules[name]) {
      throw new Error(`Store ${name} not exists.`);
    } else {
      return Object.keys(this.modules[name]).length === 0 ? null : this.modules[name];
    }
  }
}

export default new Store();
