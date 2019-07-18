import { body, validationResult } from 'express-validator'
import { localAuth, createAuthToken } from '../auth'
import User from '../models/user'

export const login = (req, res, next) => {
  localAuth(req, res, next)
}

export const register = async (req, res, next) => {
  const { username, password } = req.body
  const user = await User.create({ username, password })
  const token = createAuthToken(user.toJSON())
  res.status(201).json({ token })
}

export const validate = async (req, res, next) => {
  const validations = [
    body('username')
      .exists()
      .withMessage('is required')

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .isLength({ max: 32 })
      .withMessage('must be at most 32 characters long')

      .custom(value => value.trim() === value)
      .withMessage('cannot start or end with whitespace')

      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('contains invalid characters'),

    body('password')
      .exists()
      .withMessage('is required')

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .isLength({ min: 8 })
      .withMessage('must be at least 8 characters long')

      .isLength({ max: 72 })
      .withMessage('must be at most 72 characters long')
  ]

  if (req.path === '/register') {
    validations.push(
      body('username').custom(async username => {
        const exists = await User.countDocuments({ username })
        if (exists) throw new Error('already exists')
      })
    )
  }

  await Promise.all(validations.map(validation => {
    if (!('run' in validation)) return
    return validation.run(req)
  }))

  const errors = validationResult(req)
  if (errors.isEmpty()) return next()

  res.status(422).json({ errors: errors.array({ onlyFirstError: true }) })
}

export default {
  login,
  register,
  validate
}
