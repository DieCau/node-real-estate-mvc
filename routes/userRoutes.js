import express from 'express';
import { formLogin, formRegister, toConfirm, formForgetPassword, toRegister } from '../controllers/userController.js';

const router = express.Router()

// Routing
router.get('/login', formLogin);
router.get('/register', formRegister);
router.post('/register', toRegister);
router.get('/confirm/:token', toConfirm);
router.get('/forget-password', formForgetPassword);




export default router;