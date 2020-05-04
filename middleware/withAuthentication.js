import { ObjectId } from 'mongodb';

const withAuthentication = handler => (req, res) => {
  if (req.session.userId) {
    console.log(req.session.userId);
    return req.db.collection('users').findOne(ObjectId(req.session.userId))
      .then((user) => {
        console.log(user);
        if (user) req.user = user;
        return handler(req, res);
      });
  }
  return handler(req, res);
};

export default withAuthentication;