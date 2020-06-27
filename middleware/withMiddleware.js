import nextConnect from 'next-connect';
import withDatabase from './withDatabase';
import withSession from './withSession';
import passport from 'utils/passport';

const withMiddleware = nextConnect();

withMiddleware
  .use(withDatabase)
  .use(withSession)
  .use(passport.initialize())
  .use(passport.session());

export default withMiddleware;