import nextConnect from 'next-connect';
import withDatabase from './withDatabase';
import withSession from './withSession';
import withAuthentication from './withAuthentication';
import passport from 'utils/passport';

const withMiddleware = nextConnect();

withMiddleware
  .use(withDatabase)
  .use(withSession)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session());

export default withMiddleware;