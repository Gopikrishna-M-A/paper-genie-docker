import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoDBSessionStore from 'connect-mongodb-session';
dotenv.config({ path: './.env' });


const URI = process.env.MONGODB_URI;
const NAME = process.env.MONGODB_NAME;

const DB_URI = `${URI}/${NAME}`;
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));



  const MongoDBStore = MongoDBSessionStore(session);

  const store = new MongoDBStore({
    uri: DB_URI, // Use the same MongoDB URI
    collection: 'sessions', // Collection name for sessions
  });
  
  store.on('error', (error) => {
    console.error('MongoDB Session Store Error:', error);
  });

 export { mongoose, store };
