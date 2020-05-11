import nextConnect from "next-connect";
import withMiddleware from "middleware/withMiddleware";
const ObjectID = require("mongodb").ObjectID;

const handler = nextConnect();

handler.use(withMiddleware);

handler.get(async (req, res) => {
  const {
    query: { userId },
  } = req;

  try {
    const userProfile = await req.db
      .collection("users")
      .findOne({ _id: new ObjectID(userId) });

    return res.status(200).send({ success: true, data: userProfile });
  } catch (err) {
    res.status(400).send({ success: false, error: err });
  }
});

handler.delete(async (req, res) => {
  const {
    query: { userId },
  } = req;

  try {
    await req.db
      .collection("users")
      .deleteOne({ '_id': new ObjectID(userId) });
    return res.status(204).send({ success: true });
  } catch (err) {
    res.status(400).send({ success: false, error: err });
  }
});

export default handler;
