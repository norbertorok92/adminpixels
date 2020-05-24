import nextConnect from "next-connect";
import withMiddleware from "middleware/withMiddleware";
import { extractUser } from "utils/api-utils";
const ObjectID = require("mongodb").ObjectID;

const handler = nextConnect();

handler.use(withMiddleware);

handler.get(async (req, res) => {
  res.json({ user: extractUser(req) });
});

handler.patch(async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }
  switch (req.body.moderationType) {
    case "selectQuiz":
      return updateQuiz(req, res);

    case "selectQuizAnswer":
      return updateQuizAnswer(req, res);

    default:
      return updateUserProfile(req, res);
  }
});

const updateQuizAnswer = async (req, res) => {
  const {
    questionSlug,
    competencySlug,
    selectedAnswer,
    isAnswerCorrect,
  } = req.body;

  const currentUser = await req.db
    .collection("users")
    .findOne({ _id: new ObjectID(req.user._id) });

  const hasAnswerDataThisQuestion = await req.db.collection("users").findOne({
    $and: [
      { _id: new ObjectID(req.user._id) },
      { "answersData.questionSlug": questionSlug },
      { "answersData.competencySlug": competencySlug },
    ],
  });

  if (!!hasAnswerDataThisQuestion) {
    await req.db.collection("users").updateOne(
      {
        $and: [
          { _id: new ObjectID(req.user._id) },
          { "answersData.questionSlug": questionSlug },
          { "answersData.competencySlug": competencySlug },
        ],
      },
      {
        $set: {
          "answersData.$.selectedAnswer": selectedAnswer,
          "answersData.$.isAnswerCorrect": isAnswerCorrect,
        },
      }
    );
    return res.json({
      selectedAnswer: {
        questionSlug,
        competencySlug,
        selectedAnswer,
        isAnswerCorrect,
      },
    });
  } else {
    await req.db.collection("users").updateOne(
      { _id: new ObjectID(req.user._id) },
      {
        $addToSet: {
          answersData: {
            questionSlug,
            competencySlug,
            selectedAnswer,
            isAnswerCorrect,
          },
        },
      }
    );
    return res.json({
      selectedAnswer: {
        questionSlug,
        competencySlug,
        selectedAnswer,
        isAnswerCorrect,
      },
    });
  }
};

const updateQuiz = async (req, res) => {
  const { quiz } = req.body;

  const currentUser = await req.db
    .collection("users")
    .findOne({ _id: new ObjectID(req.user._id) });

  const competencyAlreadyStarted = currentUser.competencies && currentUser.competencies.filter(
    (item) => item.slug === quiz.slug
  );

  if (currentUser.competencies && competencyAlreadyStarted.length > 0) {
    await req.db.collection("users").updateOne(
      {
        $and: [
          { _id: new ObjectID(req.user._id) },
          { "competencies.slug": quiz.slug },
        ],
      },
      {
        $set: {
          "competencies.$.competencyScore": quiz.competencyScore,
        },
      }
    );
    return res.json({ quiz: quiz });
  } else {
    await req.db.collection("users").updateOne(
      { _id: new ObjectID(req.user._id) },
      {
        $addToSet: {
          competencies: quiz,
        },
      }
    );
    return res.json({ quiz: quiz });
  }
};

const updateUserProfile = async (req, res) => {
  const { firstName, lastName, bio } = req.body;
  await req.db.collection("users").updateOne(
    { _id: new ObjectID(req.user._id) },
    {
      $set: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(bio && { bio }),
        lastModified: new Date(),
      },
    }
  );
  return res.json({ user: { firstName, lastName, bio } });
};

export default handler;
