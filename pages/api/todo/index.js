import nextConnect from 'next-connect';
import withMiddleware from 'middleware/withMiddleware';
import { extractUser } from 'utils/api-utils';

const handler = nextConnect();

handler.use(withMiddleware);

handler.post(async (req, res) => {
  const todo = req.body.todo;
  const createTime = req.body.createTime;
  const completed = req.body.completed;
  try {
    const user = await req.db.collection('todos')
      .insertOne({ todo, createTime, completed })
      .then(({ ops }) => ops[0]);

    res.status(201).json({success: true, todo: { todo, createTime, completed }});
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