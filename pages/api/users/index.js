import nextConnect from 'next-connect';
import withMiddleware from 'middleware/withMiddleware';

const handler = nextConnect();

handler.use(withMiddleware);

handler.get(async (req, res) => {
    try {
        let user = await req.db.collection('users').findOne()
        res.status(200).json({success: true, data: user})
    } catch (error) {
        res.status(400).json({success: false})
    }
});

export default handler;