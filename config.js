export default {
  db: {
    prod: process.env.DATABASE_URL,
    test: process.env.DATABASE_URL_TEST,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: '7d'
  }
}
