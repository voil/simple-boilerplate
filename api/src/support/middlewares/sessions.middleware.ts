import * as session from 'express-session';

const sessionMiddleware = session({
  secret: 'averylogphrasebiggerthanthirtytwochars',
  salt: 'mq9hDxBVDbspDR6n',
  resave: false,
  saveUninitialized: false
});

export default sessionMiddleware;