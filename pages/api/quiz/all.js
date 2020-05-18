import nextConnect from 'next-connect';
import withMiddleware from 'middleware/withMiddleware';

const handler = nextConnect();

handler.use(withMiddleware);

handler.get(async (req, res) => {
    try {
        const quizList = await req.db.collection('quiz').find({}).toArray()
        return res.status(200).send({success: true, data: quizList})
    } catch (err) {
        res.status(400).send({success: false, error: err});
    }
});

export default handler;