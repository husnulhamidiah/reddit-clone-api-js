import express from 'express'
import logger from 'morgan'
import routes from './routes'
import './db'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)

export default app
