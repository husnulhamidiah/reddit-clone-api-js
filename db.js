import mongoose from 'mongoose'
import log from 'debug'

const debug = log('express-starter:db')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500
})
mongoose.connection.on('connected', () => debug('successfully connected to db'))
mongoose.connection.on('error', console.error)
