import nextConnect from 'next-connect';
import withMiddleware from 'middleware/withMiddleware';
const ObjectID = require('mongodb').ObjectID;

const handler = nextConnect();

handler.use(withMiddleware);

handler.delete(async (req, res) => {
  const { query: {todoId} } = req
  try {
        await req.db.collection('todos').deleteOne({'_id': new ObjectID(todoId)})
        res.status(204).send({success: true})
    } catch (err) {
        res.status(400).send({success: false, error: err});
    }
});

export default handler;