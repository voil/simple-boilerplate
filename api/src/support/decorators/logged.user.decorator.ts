import { createParamDecorator } from '@nestjs/common';

/**
 * CurrentLoggedUser
 * Decorator param to get current logged user.
 *
 */
export const CurrentLoggedUser = createParamDecorator((data, context) => {
  return context.args[2].req.session.currentLoggedUser || '';
});
