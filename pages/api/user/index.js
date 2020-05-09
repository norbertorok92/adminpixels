import nextConnect from "next-connect";
import withMiddleware from "middleware/withMiddleware";
import { extractUser } from "utils/api-utils";

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
  const { questionSlug, competencySlug, selectedAnswer, isAnswerCorrect } = req.body;
  const hasAnswerDataThisQuestion = await req.db
    .collection("users")
    .findOne(
      { "answersData.questionSlug": questionSlug },
      { "answersData.competencySlug": competencySlug }
    );

  if (!!hasAnswerDataThisQuestion) {
    await req.db.collection("users").updateOne(
      {
        $and: [
          { "answersData.questionSlug": questionSlug },
          { "answersData.competencySlug": competencySlug },
        ],
      },
      {
        $set: {
          "answersData.$.selectedAnswer": selectedAnswer,
          "answersData.$.isAnswerCorrect": isAnswerCorrect
        },
      }
    );
    return res.json({ selectedAnswer: { questionSlug, competencySlug, selectedAnswer, isAnswerCorrect } });
  } else {
    await req.db.collection("users").updateOne(
      { _id: req.user._id },
      {
        $addToSet: {
          answersData: {
            questionSlug,
            competencySlug,
            selectedAnswer,
            isAnswerCorrect
          },
        },
      }
    );
    return res.json({ selectedAnswer: { questionSlug, competencySlug, selectedAnswer, isAnswerCorrect } });
  }
};

const updateQuiz = async (req, res) => {
  const { quiz } = req.body;

  const competencyAlreadyStarted = await req.db
    .collection("users")
    .findOne(
      { "competencies.slug": quiz.slug }
    );

  if (!!competencyAlreadyStarted) {
    await req.db.collection("users").updateOne(
      { "competencies.slug": quiz.slug },
      {
        $set: {
          "competencies.$.competencyScore": quiz.competencyScore,
        },
      }
    );
    return res.json({ quiz: quiz });
  } else {
    await req.db.collection("users").updateOne(
      { _id: req.user._id },
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
    { _id: req.user._id },
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
