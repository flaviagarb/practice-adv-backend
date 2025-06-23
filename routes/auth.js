import express from 'express';
import * as loginController from '../controllers/loginController.js';

const router = express.Router()

router.get('/login', loginController.index);
router.post('/login', loginController.postLogin);
router.get('/logout', loginController.logout);

export default router; 