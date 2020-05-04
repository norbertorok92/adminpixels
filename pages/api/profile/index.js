import nextConnect from 'next-connect';
import withMiddleware from 'middleware/withMiddleware';
import { extractUser } from 'utils/api-utils';

const handler = nextConnect();

handler.use(withMiddleware);

handler.get(async (req, res) => {
    res.json({ user: extractUser(req) })
});

export default handler;