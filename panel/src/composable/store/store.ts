import { reactive } from 'vue';
import user from '@/composable/store/modules/userStore';

type PayloadStoreType<T> = {
  readonly [K in keyof T]: T[K];
}

/**
 * @interface {StoreInterface}
 */
interface StoreInterface {
  commit<T>(name: string, payload: PayloadStoreType<T | any>): void;
  get<T>(name: string): PayloadStoreType<T | any>;
}

/**
 * Store
 * Store to handle all reactive elements.
 * @implements {StoreInterface}
 */
class Store implements StoreInterface {
  private modules: any = reactive({
    user,
  })

  /**
   * Method to commit changes to store.
   * @param {String} name
   * @param {PayloadStoreType<T>} payload
   */
  public commit<T>(name: string, payload: PayloadStoreType<T | any>): void {
    if (!this.modules[name]) {
      throw new Error(`Store ${name} not exists.`);
    } else {
      this.modules[name] = {
        ...this.modules[name],
        ...payload,
      };
    }
  }

  /**
   * Method to get element from store.
   * @param {String} name
   * @return {PayloadStoreType<T>}
   */
  public get<T>(name: string): PayloadStoreType<T | any> {
    if (!this.modules[name]) {
      throw new Error(`Store ${name} not exists.`);
    } else {
      return this.modules[name];
    }
  }
}

export default new Store();
