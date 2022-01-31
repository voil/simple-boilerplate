import { createParamDecorator } from '@nestjs/common';

/**
 * Session
 * Decorator session
 */
export const Session = createParamDecorator((_, context) => {
  return context.args[2].req.session;
});
