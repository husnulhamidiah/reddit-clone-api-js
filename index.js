import {} from 'dotenv/config'
import http from 'http'
import express from 'express'
import logger from 'morgan'
import log from './utils/log'
import './db'

const app = express()
const port = normalizePort(process.env.PORT)

app.set('port', port)

// refs: https://stackoverflow.com/q/42009672
app.use(logger('dev', { stream: { write: msg => log.server(msg.trimEnd()) } }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const server = http.createServer(app)

server.listen(port, () => log.server(`listening on port ${port}`))

function normalizePort (val = 3000) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}
