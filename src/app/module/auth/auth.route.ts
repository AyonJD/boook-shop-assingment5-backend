import express from 'express'
import { AuthController } from './auth.controller'

const router = express.Router()

router.post('/signup', AuthController.signupUser)
router.post('/login', AuthController.loginUser)
router.get('/me', AuthController.loggedInUser)

export const AuthRoute = router
