import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

router.get('/', UserController.listUsers);
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

export default router;
