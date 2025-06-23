import express from 'express'
import UserController from '../controllers/users.js';

const router = express.Router();

/* GET users listing */

router.get('/', UserController.get);

export default router;