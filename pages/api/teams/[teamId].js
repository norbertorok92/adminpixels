import nextConnect from "next-connect";
import withMiddleware from "middleware/withMiddleware";
const ObjectID = require("mongodb").ObjectID;

const handler = nextConnect();

handler.use(withMiddleware);

handler.get(async (req, res) => {
  const {
    query: { teamId },
  } = req;

  try {
    const teamProfile = await req.db
      .collection("teams")
      .findOne({ _id: new ObjectID(teamId) });

    const teamMembers = teamProfile.members;

    let mappedTeamMembersList = [];
    teamMembers.map((user) => {
      mappedTeamMembersList.push(new ObjectID(user));
    });

    const teamMembersData = await req.db
      .collection("users")
      .find({ _id: { $in: mappedTeamMembersList } })
      .toArray();

    return res
      .status(200)
      .send({ success: true, data: { teamProfile, teamMembersData } });
  } catch (err) {
    res.status(400).send({ success: false, error: err });
  }
});

handler.delete(async (req, res) => {
  const {
    query: { teamId },
  } = req;

  try {
    await req.db.collection("teams").deleteOne({ _id: new ObjectID(teamId) });
    return res.status(204).send({ success: true });
  } catch (err) {
    res.status(400).send({ success: false, error: err });
  }
});

handler.post(async (req, res) => {
  const {
    query: { teamId },
  } = req;

  const { userId } = req.body;

  try {
    const selectedTeam = await req.db
      .collection("teams")
      .find({ _id: new ObjectID(teamId) }).toArray();
    const alreadyMembers = selectedTeam[0].members
    const teamName = selectedTeam[0].teamName
    const newMembersList = alreadyMembers.filter(member => member !== userId)

    await req.db.collection("teams").updateOne(
        { _id: new ObjectID(teamId) },
        {
            $set: {
                members: newMembersList,
            },
        }
    );

    const selectedUser = await req.db
      .collection("users")
      .find({ _id: new ObjectID(userId) }).toArray();
    const memberOfTeams = selectedUser[0].memberOfTeams
    const newmemberOfTeamsList = memberOfTeams.filter(team => team !== teamName)

    await req.db.collection("users").updateOne(
        { _id: new ObjectID(userId) },
        {
            $set: {
                memberOfTeams: newmemberOfTeamsList,
            },
        }
    );

    return res.status(204).send({ success: true });
  } catch (err) {
    res.status(400).send({ success: false, error: err });
  }
});

export default handler;
