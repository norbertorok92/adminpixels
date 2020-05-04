import nextConnect from 'next-connect';
import withMiddleware from 'middleware/withMiddleware';
import passport from 'utils/passport';
import { extractUser } from 'utils/api-utils';

const handler = nextConnect();

handler.use(withMiddleware);

handler.post(passport.authenticate('local'), (req, res) => {
  // return our user object
  try {
    res.json({ user: extractUser(req) });
  } catch (err) {
    res.status(400).send('Email or password is incorrect');
  }

});

handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
