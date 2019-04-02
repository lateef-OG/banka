import { Router } from 'express';
import AccountController from '../controllers/account.controller';

const router = Router();

router.get('/', AccountController.listAccounts);
router.post('/create-account', AccountController.createAccount);

export default router;
