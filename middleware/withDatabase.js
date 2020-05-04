import { MongoClient } from 'mongodb';


const client = new MongoClient('mongodb+srv://adminpixel:adminpixel92@adminpixelcluster-fttsv.gcp.mongodb.net/AdminPixelDB-PP?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function withDatabase(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(process.env.DB_NAME);
  return next();
}

export default withDatabase;