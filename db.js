import mongoose from 'mongoose'
import log from './utils/log'
import config from './config'

mongoose.connect(config.db.prod, config.db.options)
mongoose.connection.on('connected', () => log.db('successfully connected to db'))
mongoose.connection.on('error', console.error)
