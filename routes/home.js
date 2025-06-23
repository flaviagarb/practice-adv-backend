import express from 'express';
import HomeController from '../controllers/home.js';

const router = express.Router();

/* GET HOMEPAGE */

router.get('/', HomeController.get);

export default router;