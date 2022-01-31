import { ErrorResponseInterface } from '@/utils/interfaces';

/**
 * ErrorHandlerService
 * Error handler service for catch all logs.
 */
class ErrorHandlerService {
  /**
   * Method to parse error response.
   */
  public parseError(error: readonly ErrorResponseInterface[] | undefined) {
    if (error) {
      switch (error[0].type) {
        case 'FORBIDDEN_EXCEPTION':
          this.handleForbiddenException();
          break;
        default:
          console.log('brak dostepu');
          break;
      }
    }
  }

  /**
   * Method to handle forbidden exception.
   */
  private handleForbiddenException(): void {
    // if (LoggedUserComposition.getUserParams()?.isLogged
    //   && !LogoutComposition.getLogoutParams().isLogoutActive
    // ) {
    //   // LoggedUserComposition.setUserState(false);
    //   // LoggedUserComposition.setUserParams({});
    //   // LogoutComposition.setLogoutLoadingState(true);

    //   // this.notificationService.show('error', {
    //   //   message: this.languageComposition.getLanguageParams()
    //   //     .translate.errorHandler.forbidden.message.toString(),
    //   //   description: this.languageComposition.getLanguageParams()
    //   //     .translate.errorHandler.forbidden.description.toString(),
    //   // });
    //   // if (LoggedUserComposition.vueRouter) {
    //   //   LogoutComposition.setLogoutLoadingState(false);
    //   //   LoggedUserComposition.vueRouter.push('/authentication/login');
    //   // }
    // }
  }
}

export default new ErrorHandlerService();
