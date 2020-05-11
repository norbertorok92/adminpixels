import nextConnect from "next-connect";
import withMiddleware from "middleware/withMiddleware";
import { extractUser } from "utils/api-utils";
const ObjectID = require("mongodb").ObjectID;

const handler = nextConnect();

handler.use(withMiddleware);

handler.post(async (req, res) => {
  const teamName = req.body.teamName;
  const description = req.body.description;
  const competencyScore = req.body.competencyScore;
  const members = [];

  try {
    const user = await req.db
      .collection("teams")
      .insertOne({ teamName, description, competencyScore, members })
      .then(({ ops }) => ops[0]);

    res
      .status(201)
      .json({
        success: true,
        team: { teamName, description, competencyScore, members },
      });
  } catch (err) {
    res.status(400).send({ success: false, error: err });
  }
});

handler.patch(async (req, res) => {
  const { teamId, usersList } = req.body;
  let mappedUsersList = [];
  usersList.map((user) => {
    mappedUsersList.push(new ObjectID(user));
  });

  const teamData = await req.db
    .collection("teams")
    .findOne({ _id: new ObjectID(teamId) });

  await req.db.collection("users").updateMany(
    { _id: { $in: mappedUsersList } },
    {
      $addToSet: {
        memberOfTeams: teamData.teamName,
      },
    }
  );

  await req.db.collection("teams").updateOne(
    { _id: new ObjectID(teamId) },
    {
      $addToSet: {
        members: { $each: usersList },
      },
    }
  );
  res.json({ team: teamData });
});

export default handler;
