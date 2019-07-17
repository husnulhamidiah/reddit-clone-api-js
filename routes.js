import { Router } from 'express'
import { validationResult } from 'express-validator'
import users from './controllers/users'

// import { jwtAuth, postAuth, commentAuth } from './auth'
const errorFormatter = ({ msg, param, location }) => ({ [param]: `${param} on ${location} ${msg}` })

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req).formatWith(errorFormatter)
    if (errors.isEmpty()) return next()

    res.status(422).json({ errors: errors.array({ onlyFirstError: true }) })
  }
}

// refs : https://expressjs.com/en/advanced/best-practice-performance.html#use-promises
const wrap = fn => (...args) => fn(...args).catch(args[2])

const router = Router()

router.post('/login', validate(users.validation()), users.login)
router.post('/register', validate(users.validation('register')), wrap(users.register))

router.use('*', (req, res) => res.status(404).json({ message: 'not found' }))
router.use((err, req, res, next) => res.status(500).json({ errors: err.message }))

export default router
