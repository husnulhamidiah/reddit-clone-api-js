import mongoose from 'mongoose'
import config from './config'

mongoose.connect(config.db.prod, config.db.options)
mongoose.connection.on('error', console.error)
