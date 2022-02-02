import { Router, RouteRecordRaw } from 'vue-router';
import LoggedUserStateMachine from '@/composable/store/machines/authorization/loggedUserStateMachine';

/**
 * RouterService
 * Router service to check authorization.
 */
export default class RouterService {
  /**
   * Method to check is user authorization.
   * @param {Router} router
   */
  public static checkAuthentication(router: Router): void {
    const pathWithLogin = this.getPathByName(router, 'login');

    router.beforeEach((to, _, next) => {
      const pathThatRequiresAuth = to.matched.some((record) => record.meta.authentication);
      (async () => {
        if (pathThatRequiresAuth) {
          await LoggedUserStateMachine.setState('pendingCheckLogged', {
            handlerSuccess: () => next(),
            handlerError: () => next(pathWithLogin as any),
          });
        } else if (to.name === (pathWithLogin && pathWithLogin.name)) {
          await LoggedUserStateMachine.setState('pendingCheckLogged', {
            handlerSuccess: () => next(this.getPathByName(router, 'after') as any),
            handlerError: () => next(),
          });
        } else {
          next();
        }
      })();
    });
  }

  /**
   * Method to get path by name.
   * @param {Router} router
   * @param {String} name
   * @return {RouteRecordRaw | undefined}
   */
  private static getPathByName(router: Router, name: string): RouteRecordRaw | undefined {
    return router.options.routes.find((record) => record.meta
      ? (record?.meta.authorizationType === name) : false);
  }
}
