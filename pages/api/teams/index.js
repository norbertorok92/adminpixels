import nextConnect from 'next-connect';
import withMiddleware from 'middleware/withMiddleware';
import { extractUser } from 'utils/api-utils';

const handler = nextConnect();

handler.use(withMiddleware);

handler.post(async (req, res) => {
  const teamName = req.body.teamName;
  const description = req.body.description;
  const competencyScore = req.body.competencyScore;

  try {
    const user = await req.db.collection('teams')
      .insertOne({ teamName, description, competencyScore })
      .then(({ ops }) => ops[0]);

    res.status(201).json({success: true, team: { teamName, description, competencyScore }});
  } catch (err) {
    res.status(400).send({success: false, error: err});
  }
});

// handler.patch(async (req, res) => {
//   if (!req.user) {
//     req.status(401).end();
//     return;
//   }

//   const { firstName, lastName, bio } = req.body;

//   await req.db.collection('users').updateOne(
//     { _id: req.user._id },
//     {
//       $set: {
//         firstName: firstName,
//         lastName: lastName,
//         bio: bio || '',
//       },
//     },
//   );
//   res.json({ user: { firstName, lastName, bio } });
// });

export default handler;