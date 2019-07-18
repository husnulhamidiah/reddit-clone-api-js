import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  (token, done) => {
    done(null, token.user)
  }
)

export default jwtStrategy
