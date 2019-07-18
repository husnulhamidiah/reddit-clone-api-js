import jwt from 'jsonwebtoken'
import passport from 'passport'

export const createAuthToken = user => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })
}

export const localAuth = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.status(401).json(info)
    const token = this.createAuthToken(user)
    res.json({ token })
  })(req, res)
}

export const jwtAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(401).end()
    req.user = user
    next()
  })(req, res)
}

export const postAuth = (req, res, next) => {
  if (req.post.author._id.equals(req.user.id) || req.user.admin) return next()
  res.status(401).end()
}
