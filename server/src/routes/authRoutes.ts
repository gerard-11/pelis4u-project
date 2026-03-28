import { Router } from 'express'
import { register, login, refresh, logout } from '../controllers/authController.js'
import { validate, registerSchema, loginSchema } from '../middlewares/validate.js'

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.get('/refresh', refresh)
router.post('/logout', logout)

export default router
