import nextConnect from 'next-connect';
import withMiddleware from 'middleware/withMiddleware';

const handler = nextConnect();

handler.use(withMiddleware);

handler.get(async (req, res) => {

    let doc = await req.db.collection('test').findOne()
    console.log(doc);
    res.json(doc);
});

export default handler;