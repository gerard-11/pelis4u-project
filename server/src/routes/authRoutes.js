import { Router } from 'express'
import {getWatchlist, login, logout, refresh, register} from '../controllers/authController.js'
import {authMiddleware} from "../middlewares/authMiddleware.ts";
import { validate, registerSchema,loginSchema } from '../middlewares/validate.js'

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.get('/refresh', refresh)
router.post('/logout', logout)
router.get('/', authMiddleware, getWatchlist)

export default router