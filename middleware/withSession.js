import {
  session, promisifyStore, Store, MemoryStore,
} from 'next-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo({ Store, MemoryStore });

async function withSession(req, res, next) {
  const mongoStore = new MongoStore({
    client: req.dbClient,
    stringify: false,
  });
  return session({
    store: promisifyStore(mongoStore),
  })(req, res, next);
}

export default withSession;