import { body, validationResult } from 'express-validator/check'

export const load = async (req, res, next, id) => {
  req.comment = await req.post.comments.id(id)
  if (!req.comment) return next(new Error('comment not found'))
  next()
}

export const create = async (req, res, next) => {
  const post = await req.post.addComment(req.user.id, req.body.comment)
  res.status(201).json(post)
}

export const destroy = async (req, res, next) => {
  try {
    const post = await req.post.removeComment(req.params.comment)
    res.json(post)
  } catch (err) {
    next(err)
  }
}

export const validate = async (req, res, next) => {
  const validations = [
    body('comment')
      .exists()
      .withMessage('is required')

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .isLength({ max: 2000 })
      .withMessage('must be at most 2000 characters long')
  ]

  await Promise.all(validations.map(validation => {
    if (!('run' in validation)) return
    return validation.run(req)
  }))

  const errors = validationResult(req)
  if (errors.isEmpty()) return next()

  res.status(422).json({ errors: errors.array({ onlyFirstError: true }) })
}

export default {
  load,
  create,
  destroy,
  validate
}
