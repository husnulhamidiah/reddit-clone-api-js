import { Router } from 'express'

import root from './root'
import users from './users'

const router = Router()

router.use(root)
router.use('/users', users)

export default router
