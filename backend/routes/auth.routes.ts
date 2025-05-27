import express from 'express';
import { signup, login ,  forgotPassword, getUserProfile} from '../controller/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { signupSchema, loginSchema, forgotPasswordSchema } from '../middleware/validate.middleware';
import {verifyToken} from '../middleware/auth.middleware'
const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword)
router.get('/profile', verifyToken, getUserProfile)


export default router;