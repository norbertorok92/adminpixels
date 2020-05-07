import nextConnect from 'next-connect';
import withMiddleware from 'middleware/withMiddleware';
import { extractUser } from 'utils/api-utils';

const handler = nextConnect();

handler.use(withMiddleware);

handler.get(async (req, res) => {
    res.json({ user: extractUser(req) })
});

handler.patch(async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }

  const { firstName, lastName, bio } = req.body;

  await req.db.collection('users').updateOne(
    { _id: req.user._id },
    {
      $set: {
        firstName: firstName,
        lastName: lastName,
        bio: bio || '',
      },
    },
  );
  res.json({ user: { firstName, lastName, bio } });
});

export default handler;