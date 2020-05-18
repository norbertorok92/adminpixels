import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import withMiddleware from "middleware/withMiddleware";
import { extractUser } from "utils/api-utils";

const handler = nextConnect();

handler.use(withMiddleware);

handler.post(async (req, res) => {
  const { firstName, lastName, userRole, password, confirmPassword } = req.body;
  const email = normalizeEmail(req.body.email);

  if ((await req.db.collection("users").countDocuments({ email })) > 0) {
    res.status(403).send("The email has already been used.");
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await req.db
      .collection("users")
      .insertOne({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        userRole,
      })
      .then(({ ops }) => ops[0]);

    res.status(201).json({
      success: true,
      user: { firstName, lastName, userRole, email },
    });
  } catch (err) {
    res.status(400).send({ success: false, error: err });
  }
});

export default handler;
