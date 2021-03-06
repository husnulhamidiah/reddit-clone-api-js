import { Router } from 'express'
import { jwtAuth, postAuth, commentAuth } from './auth'
import users from './controllers/users'
import posts from './controllers/posts'
import comments from './controllers/comments'

const wrap = fn => (...args) => fn(...args).catch(args[2])

const router = Router()

router.post('/login', users.validate, users.login)
router.post('/register', users.validate, wrap(users.register))

router.param('post', posts.load)
router.get('/posts', posts.list)
router.get('/posts/:category', posts.listByCategory)
router.get('/post/:post', posts.show)
router.post('/posts', jwtAuth, posts.validate, wrap(posts.create))
router.delete('/post/:post', jwtAuth, postAuth, posts.destroy)
router.get('/post/:post/upvote', jwtAuth, posts.upvote)
router.get('/post/:post/downvote', jwtAuth, posts.downvote)
router.get('/post/:post/unvote', jwtAuth, posts.unvote)
router.get('/user/:user', posts.listByUser)

router.param('comment', comments.load)
router.post('/post/:post', jwtAuth, comments.validate, comments.create)
router.delete('/post/:post/:comment', jwtAuth, commentAuth, comments.destroy)

router.use('*', (req, res) => res.status(404).json({ message: 'not found' }))
router.use((err, req, res, next) => res.status(500).json({ errors: err.message }))

export default router
