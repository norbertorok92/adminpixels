import nextConnect from 'next-connect';
import withMiddleware from 'middleware/withMiddleware';
import { extractUser } from 'utils/api-utils';
import { stringToSlug } from "utils/utils";

const handler = nextConnect();

handler.use(withMiddleware);

handler.post(async (req, res) => {
  const slug = stringToSlug(req.body.title);
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const data = req.body.data;


  try {
    const quizType = await req.db.collection('quiz')
      .insertOne({ title, data, description, category, slug })
      .then(({ ops }) => ops[0]);

    res.status(201).json({success: true, quiz: { title, data, description, category, slug }});
  } catch (err) {
    res.status(400).send({success: false, error: err});
  }
});

export default handler;