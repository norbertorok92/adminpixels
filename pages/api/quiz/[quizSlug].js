import nextConnect from 'next-connect';
import withMiddleware from 'middleware/withMiddleware';

const handler = nextConnect();

handler.use(withMiddleware);

handler.get(async (req, res) => {
    const {
        query: { quizSlug },
    } = req

    try {
        const selectedQuiz = await req.db.collection('quiz').findOne({'slug': quizSlug})
        return res.status(200).send({success: true, data: selectedQuiz})
    } catch (err) {
        res.status(400).send({success: false, error: err});
    }
});

export default handler;