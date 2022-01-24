import * as session from 'express-session';

const sessionMiddleware = session({
  secret: 'averylogphrasebiggerthanthirtytwochars',
  salt: 'mq9hDxBVDbspDR6n',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 1000 * 60,
    sameSite: true,
    httpOnly: false,
    secure: false
  },
});

export default sessionMiddleware;