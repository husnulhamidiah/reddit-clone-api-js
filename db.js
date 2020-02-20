import mongoose from 'mongoose';
import log from 'debug';

const debug = log('express-starter:db');

console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
});
mongoose.connection.on('connected', () => debug('successfully connected to db'));
mongoose.connection.on('error', console.error);
